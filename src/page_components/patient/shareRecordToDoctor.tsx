import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { CheckBox } from "@/components/common/forms/checkbox";
import GrantAccessToSpecificRecordsModal from "@/components/modal/patient/grantAccessToSpecificRecordsModal";
import SuccessfullyGrantedAccessToSpecificRecordsModal from "@/components/modal/patient/successfulyGrantedAccessToSpecificRecords";
import { useGetAllPatientMedicalRecords } from "@/lib/queries/patient";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleGrantAccessToSpecificRecordsModal } from "@/lib/redux/slices/modals/modalSlice";
import { formatDateToSlashDate } from "@/utils/formatDateToSlashDate";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const ShareRecordToDoctor = () => {
  const { address } = useAccount();

  const { loading, medicalRecords, error } = useGetAllPatientMedicalRecords({
    walletAddress: address ? address : "",
  });

  const doctor = useSelector((state: RootState) => state.doctor.currentDoctor);

  const [selectedRecords, setSelectedRecords] = useState<number[]>([]);

  const handleCheckboxChange = (id: number, checked: boolean) => {
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
  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-2">FIND DOCTOR - YOUR RECORD</h1>
      <p className="text-xs lg:text-xl text-gray-7 mb-2">
        Kindly pick which diagnosis you wish to give Dr Deeman access to.
      </p>
      {loading ? (
        <BiLoaderAlt className="text-2xl text center animate-spin" />
      ) : medicalRecords ? (
        <AllOfHealthTable
          labels={["Pick", "Date", "Diagnosis", "Institution"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {medicalRecords.medicalRecords.map((record, index) => (
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
      ) : error ? (
        <p>Error fetching medical records...</p>
      ) : null}

      <Button
        variant="secondary"
        className="mx-auto flex justify-center w-[155px] mt-4"
        onClick={() => handleToggleActionNeeded()}
      >
        Confirm
      </Button>
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
