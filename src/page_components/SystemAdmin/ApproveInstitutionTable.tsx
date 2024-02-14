import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import AccessDeniedModal from "@/components/modal/SystemAdmin/AccessDeniedModal";
import ApproveInstitutionModal from "@/components/modal/SystemAdmin/ApproveInstitutionModal";
import SuccessfullyAddedModal from "@/components/modal/SystemAdmin/SuccessfullyAddedModal";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleApproveInstitutionModal } from "@/lib/redux/slices/modals/modalSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ApproveInstitution = () => {
  const institutions = [
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      name: "Hadas Health Centre",
      registrationNo: "74837383",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
  ];

  const approveInstitutionRef = useRef<HTMLDivElement | null>(null);
  const [approveInstitutionContainer, setApproveInstitutionContainer] =
    useState<HTMLElement | null>(null);
  const successfullyAddedModalRef = useRef<HTMLDivElement | null>(null);
  const [successfullyAddedModalContainer, setSuccessfullyAddedModalContainer] =
    useState<HTMLElement | null>(null);
  const accessDeniedModalRef = useRef<HTMLDivElement | null>(null);
  const [accessDeniedModalContainer, setAccessDeniedModalContainer] =
    useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const isApproveInstitutionOpen = useSelector(
    (state: RootState) => state.modal.isApproveInstitutionModalOpen
  );
  const isSuccessfullyAddedModalOpen = useSelector(
    (state: RootState) => state.modal.isSuccessfullyAddedModalOpen
  );
  const isAccessDeniedModalOpen = useSelector(
    (state: RootState) => state.modal.isAccessDeniedModalOpen
  );

  const handleToggleActionNeeded = () => {
    dispatch(toggleApproveInstitutionModal());
  };

  useEffect(() => {
    if (approveInstitutionRef.current) {
      setApproveInstitutionContainer(approveInstitutionRef.current);
    }
    if (successfullyAddedModalRef.current) {
      setSuccessfullyAddedModalContainer(successfullyAddedModalRef.current);
    }
    if (accessDeniedModalRef.current) {
      setAccessDeniedModalContainer(accessDeniedModalRef.current);
    }
  }, [
    isApproveInstitutionOpen,
    isSuccessfullyAddedModalOpen,
    isAccessDeniedModalOpen,
  ]);

  return (
    <div className="">
      <h1
        className="font-bold lg:text-3xl mb-6"
        onClick={() => handleToggleActionNeeded()}
      >
        Approve Institution
      </h1>
      <AllOfHealthTable
        labels={[
          "Institution Name",
          "Registration no.",
          "Wallet Address",
          "Phone Number",
        ]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {institutions.map((institution, index) => (
          <tr className="h-16 text-blue4 font-medium" key={index}>
            <td className="pl-2 lg:pl-7 text-xs lg:text-base">
              {institution.name}
            </td>
            <td className=" text-xs lg:text-base">
              {institution.registrationNo}
            </td>
            <td className=" text-xs lg:text-base">
              {institution.walletAddress}
            </td>
            <td className=" text-xs lg:text-base">{institution.phoneNumber}</td>
          </tr>
        ))}
      </AllOfHealthTable>
      <div ref={approveInstitutionRef}>
        <ApproveInstitutionModal
          container={approveInstitutionContainer!}
          title="Action Needed"
        />
      </div>
      <div ref={successfullyAddedModalRef}>
        <SuccessfullyAddedModal
          container={successfullyAddedModalContainer!}
          title="Successfully added"
        />
      </div>
      <div ref={accessDeniedModalRef}>
        <AccessDeniedModal
          container={accessDeniedModalContainer!}
          title="Access Denied"
        />
      </div>
    </div>
  );
};

export default ApproveInstitution;
