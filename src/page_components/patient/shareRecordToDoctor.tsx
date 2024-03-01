import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { CheckBox } from "@/components/common/forms/checkbox";
import GrantAccessToSpecificRecordsModal from "@/components/modal/patient/grantAccessToSpecificRecordsModal";
import SuccessfullyGrantedAccessToSpecificRecordsModal from "@/components/modal/patient/successfulyGrantedAccessToSpecificRecords";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleGrantAccessToSpecificRecordsModal } from "@/lib/redux/slices/modals/modalSlice";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShareRecordToDoctor = () => {
  const recordLists = [
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
  ];

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
      <AllOfHealthTable
        labels={["Pick", "Date", "Diagnosis", "Institution"]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {recordLists.map((prescription, index) => (
          <tr
            className="h-16 text-blue4 font-medium"
            key={index}
            onClick={() => handleToggleActionNeeded()}
          >
            <td>
              <CheckBox id="" label="" checkboxClassName="ml-3 lg:ml-10" />
            </td>
            <td className="pl-2 lg:pl-7 text-xs lg:text-base">
              {prescription.date}
            </td>
            <td className=" text-xs lg:text-base">{prescription.doctor}</td>
            <td className=" text-xs lg:text-base">
              {prescription.institution}
            </td>
          </tr>
        ))}
      </AllOfHealthTable>
      <Button
        variant="secondary"
        className="mx-auto flex justify-center w-[155px] mt-4"
      >
        Confirm
      </Button>
      <div ref={grantAccessToSpecificRecordsRef}>
        <GrantAccessToSpecificRecordsModal
          title="Action Needed"
          container={grantAccessToSpecificRecordsContainer!}
        />
      </div>
      <div ref={successfullyGrantAccessToSpecificRecordsRef}>
        <SuccessfullyGrantedAccessToSpecificRecordsModal
          title="Successful!"
          container={successfullyGrantAccessToSpecificRecordsContainer!}
        />
      </div>
    </div>
  );
};

export default ShareRecordToDoctor;
