import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import AccessDeniedModal from "@/components/modal/SystemAdmin/AccessDeniedModal";
import ApproveInstitutionModal from "@/components/modal/SystemAdmin/ApproveInstitutionModal";
import SuccessfullyAddedModal from "@/components/modal/SystemAdmin/SuccessfullyAddedModal";
import { useGetInstitutions } from "@/lib/queries/institutions";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleApproveInstitutionModal } from "@/lib/redux/slices/modals/modalSlice";
import type { Institution } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const ApproveInstitution = () => {
  const { institutions, loading, error } = useGetInstitutions();
  const [currentInstitution, setCurrentInstitution] =
    useState<Institution | null>(null);

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

  const handleToggleActionNeeded = (institution: Institution) => {
    dispatch(toggleApproveInstitutionModal());
    setCurrentInstitution(institution);
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

  const trimText = (text: string, maxLength: number = 15): string => {
    return text?.toString().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  return (
    <div className="w-full">
      <h1 className="font-bold lg:text-3xl mb-6">Approve Institution</h1>
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
        {loading ? (
          <BiLoaderAlt className="text-xl text-center animate-spin h-20" />
        ) : institutions ? (
          <>
            {institutions?.hospital.map((institution, index) => (
              <tr
                className="h-16 text-blue4 font-medium max-w-full"
                key={institution.id}
                onClick={() => handleToggleActionNeeded(institution)}
              >
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {institution.name}
                </td>
                <td className=" text-xs lg:text-base">{institution.regNo}</td>
                <td className=" text-xs lg:text-base">
                  {trimText(institution.admin)}
                </td>
                <td className=" text-xs lg:text-base">{institution.phoneNo}</td>
              </tr>
            ))}
          </>
        ) : (
          <p>Error fetching data....</p>
        )}
      </AllOfHealthTable>
      <div ref={approveInstitutionRef}>
        <ApproveInstitutionModal
          container={approveInstitutionContainer!}
          title="Action Needed"
          institution={currentInstitution!}
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
