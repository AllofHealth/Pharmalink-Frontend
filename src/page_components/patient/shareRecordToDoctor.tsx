import { approveMedicalRecordAccess } from "@/actions/contract/patient/patient.service.c";
import type { RecordApprovalType } from "@/actions/interfaces/Patient/app.patient.interface";
import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import GrantAccessToSpecificRecordsModal from "@/components/modal/patient/grantAccessToSpecificRecordsModal";
import SuccessfullyGrantedAccessToSpecificRecordsModal from "@/components/modal/patient/successfulyGrantedAccessToSpecificRecords";
import useAxios from "@/lib/hooks/useAxios";
import {
  requestFamilyMemberMedicalRecordApproval,
  requestMedicalRecordApproval,
} from "@/lib/mutations/patient";
import { useGetPatientByAddress } from "@/lib/queries/auth";
import { useGetAllPatientMedicalRecords } from "@/lib/queries/patient";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleGrantAccessToSpecificRecordsModal } from "@/lib/redux/slices/modals/modalSlice";
import { setApprovalType } from "@/lib/redux/slices/patient/patientSlice";
import type { GetPatientMessage } from "@/lib/types";
import { formatDateToSlashDate } from "@/utils/formatDateToSlashDate";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const ShareRecordToDoctor = () => {
  const { address, isConnected } = useAccount();
  const { axios } = useAxios({});

  const { loading: loadingPatientData, patientData } = useGetPatientByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const doctor = useSelector((state: RootState) => state.doctor.currentDoctor);
  const familyMemberId = useSelector(
    (state: RootState) => state.patient.approveRequestFamilyMemberMedicalRecord
  );

  const { loading, medicalRecords, familyMemberMedicalRecords, error } =
    useGetAllPatientMedicalRecords({
      walletAddress: address ? address : "",
      familyMemberId: familyMemberId,
    });

  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
    if (selectedRecords.length >= 1 && checked) {
      // Display an error toast if more than one record is selected
      toast.error("You can only select one record.");
      return;
    }

    setSelectedRecords((prevSelectedRecords) =>
      checked
        ? [...prevSelectedRecords, id]
        : prevSelectedRecords.filter((recordId) => recordId !== id)
    );
  };

  const grantAccessToSpecificRecordsRef = useRef<HTMLDivElement | null>(null);
  const [
    grantAccessToSpecificRecordsContainer,
    setGrantAccessToSpecificRecordsContainer,
  ] = useState<HTMLElement | null>(null);
  const successfullyGrantAccessToSpecificRecordsRef =
    useRef<HTMLDivElement | null>(null);
  const [
    successfullyGrantAccessToSpecificRecordsContainer,
    setSuccessfullyGrantAccessToSpecificRecordsContainer,
  ] = useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const isGrantAccessToSpecificRecordsModalOpen = useSelector(
    (state: RootState) => state.modal.isGrantAccessToSpecificRecordsModalOpen
  );
  const isSuccessfullyGrantAccessToSpecificRecordsModalOpen = useSelector(
    (state: RootState) =>
      state.modal.isSuccessfullyGrantedAccessToSpecificRecordsModalOpen
  );

  const handleToggleActionNeeded = () => {
    dispatch(toggleGrantAccessToSpecificRecordsModal());
  };

  useEffect(() => {
    if (grantAccessToSpecificRecordsRef.current) {
      setGrantAccessToSpecificRecordsContainer(
        grantAccessToSpecificRecordsRef.current
      );
    }
    if (successfullyGrantAccessToSpecificRecordsRef.current) {
      setSuccessfullyGrantAccessToSpecificRecordsContainer(
        successfullyGrantAccessToSpecificRecordsRef.current
      );
    }
  }, [
    isGrantAccessToSpecificRecordsModalOpen,
    isSuccessfullyGrantAccessToSpecificRecordsModalOpen,
  ]);

  const records =
    familyMemberId !== 0
      ? familyMemberMedicalRecords?.records
      : medicalRecords?.medicalRecords;

  const handleRequestEmptyRecord = async (approvalType: RecordApprovalType) => {
    if (familyMemberId === 0) {
      const contractResponse = await approveMedicalRecordAccess(approvalType, {
        practitionerAddress: doctor?.walletAddress ?? "",
        patientId: (patientData as GetPatientMessage).patient.id,
        recordId: 0,
        durationInSeconds: 36000,
      });
      console.log(contractResponse);
      if (contractResponse) {
        try {
          await requestMedicalRecordApproval({
            axios,
            dispatch,
            records: [],
            patientAddress: address,
            doctorAddress: doctor ? doctor.walletAddress : "",
            approvalType: "FULL",
          });
        } catch (error) {
          console.error("Error requesting medical record approval", error);
        }
      }
    } else {
      try {
        await requestFamilyMemberMedicalRecordApproval({
          axios,
          dispatch,
          familyMemberId,
          records: [],
          patientAddress: address,
          doctorAddress: doctor ? doctor.walletAddress : "",
          approvalType: "FULL",
        });
      } catch (error) {
        console.error("Error requesting medical record approval", error);
      }
    }
  };

  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-2">FIND DOCTOR - YOUR RECORD</h1>
      <p className="text-xs lg:text-xl text-gray-7 mb-2">
        Kindly pick which diagnosis you wish to give Dr Deeman access to.
      </p>
      {loading ? (
        <BiLoaderAlt className="text-2xl text center animate-spin" />
      ) : records && records.length > 0 ? (
        <>
          <AllOfHealthTable
            labels={["Pick", "Date", "Diagnosis", "Institution"]}
            caption="Approve Institution Table"
            headClassName="bg-gray-5 rounded-t-md"
          >
            {records.map((record, index) => (
              <tr className="h-16 text-blue4 font-medium" key={index}>
                <td>
                  <input
                    type="checkbox"
                    className="ml-3 lg:ml-10"
                    checked={selectedRecords.includes(record.id)}
                    onChange={(e) =>
                      handleCheckboxChange(record.id, e.target.checked)
                    }
                  />
                </td>
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {formatDateToSlashDate(record.date)}
                </td>
                <td className=" text-xs lg:text-base">{record.diagnosis}</td>
                <td className=" text-xs lg:text-base">{record.hospitalName}</td>
              </tr>
            ))}
          </AllOfHealthTable>
          <Button
            variant="secondary"
            className="mx-auto flex justify-center w-[155px] mt-4"
            onClick={() => handleToggleActionNeeded()}
          >
            Confirm
          </Button>
        </>
      ) : records && records.length === 0 ? (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12">
          <div className="grid gap-2">
            <p className="font-semibold text-base text-blue2">ERROR!</p>
            <Image
              src={"/assets/images/no-records.png"}
              alt=""
              width={410}
              height={369}
              className="sm:hidden"
            />
            <p className="text-2xl lg:text-5xl">No Records Found!</p>
            <p className="text-6B6B6B sm:text-2xl">
              There are currently no diagnoses to select. Please continue with
              your consultation or contact our support team for further
              assistance. aliana
            </p>
            <Button
              variant="secondary"
              className="mx-auto flex justify-center w-[155px] mt-4"
              onClick={() => handleRequestEmptyRecord("view & modify")}
            >
              Create a record request
            </Button>
          </div>
          <Image
            src={"/assets/images/no-records.png"}
            alt=""
            width={410}
            height={369}
            className="hidden sm:block"
          />
        </div>
      ) : error ? (
        <p>Error fetching medical records...</p>
      ) : null}
      <div ref={grantAccessToSpecificRecordsRef}>
        <GrantAccessToSpecificRecordsModal
          title="Action Needed"
          container={grantAccessToSpecificRecordsContainer!}
          medicalRecords={selectedRecords}
          doctor={doctor}
        />
      </div>
      <div ref={successfullyGrantAccessToSpecificRecordsRef}>
        <SuccessfullyGrantedAccessToSpecificRecordsModal
          title="Successful!"
          container={successfullyGrantAccessToSpecificRecordsContainer!}
          doctor={doctor}
        />
      </div>
    </div>
  );
};

export default ShareRecordToDoctor;
