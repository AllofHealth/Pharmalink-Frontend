import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import AcceptAdmin from "@/components/modal/SystemAdmin/AcceptAdmin";
import ActionNeededRoleModal from "@/components/modal/SystemAdmin/ActionNeededRoleModal";
import DeniedAdminModal from "@/components/modal/SystemAdmin/DeniedAdmin";
import { useGetAllPractitioners } from "@/lib/queries/admin";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleActionNeededRoleModal } from "@/lib/redux/slices/modals/modalSlice";
import type { Practitioner } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const DesignateRoles = () => {
  const { practitioners, loading } = useGetAllPractitioners();
  const [currentPractitioner, setCurrentPractitioner] =
    useState<Practitioner | null>(null);

  const actionNeededModalRef = useRef<HTMLDivElement | null>(null);
  const [actionNeededModalContainer, setActionNeededModalContainer] =
    useState<HTMLElement | null>(null);
  const acceptAdminModalRef = useRef<HTMLDivElement | null>(null);
  const [acceptAdminModalContainer, setacceptAdminModalContainer] =
    useState<HTMLElement | null>(null);
  const deniedAdminModalRef = useRef<HTMLDivElement | null>(null);
  const [deniedAdminModalContainer, setDeniedAdminModalContainer] =
    useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const isActionNeededRoleModalOpen = useSelector(
    (state: RootState) => state.modal.isActionNeededRoleModalOpen
  );
  const isAcceptAdminModalOpen = useSelector(
    (state: RootState) => state.modal.isAcceptAdminModalOpen
  );
  const isDeniedAdminModalOpen = useSelector(
    (state: RootState) => state.modal.isDeniedAdminModalOpen
  );

  const handleToggleActionNeeded = (practitioner: Practitioner) => {
    dispatch(toggleActionNeededRoleModal());
    setCurrentPractitioner(practitioner);
  };

  useEffect(() => {
    if (actionNeededModalRef.current) {
      setActionNeededModalContainer(actionNeededModalRef.current);
    }
    if (acceptAdminModalRef.current) {
      setacceptAdminModalContainer(acceptAdminModalRef.current);
    }
    if (deniedAdminModalRef.current) {
      setDeniedAdminModalContainer(deniedAdminModalRef.current);
    }
  }, [
    isActionNeededRoleModalOpen,
    isAcceptAdminModalOpen,
    isDeniedAdminModalOpen,
  ]);

  const trimText = (text: string, maxLength: number = 10): string => {
    return text?.toString().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Designate Roles</h1>
      <AllOfHealthTable
        labels={[
          "Practitioner's Name",
          "City",
          "Wallet Address",
          "Phone Number",
        ]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {loading ? (
          <BiLoaderAlt className="text-xl text-center animate-spin h-20" />
        ) : practitioners ? (
          <>
            {practitioners.allPractitioners.map((practitioner, index) => (
              <tr
                className="h-16 text-blue4 font-medium"
                key={index}
                onClick={() => handleToggleActionNeeded(practitioner)}
              >
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {practitioner.name}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(practitioner.location)}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(practitioner.walletAddress)}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(practitioner.phoneNumber)}
                </td>
              </tr>
            ))}
          </>
        ) : (
          <p>Error fetching data....</p>
        )}
      </AllOfHealthTable>
      <div ref={actionNeededModalRef}>
        <ActionNeededRoleModal
          container={actionNeededModalContainer!}
          title="Action Needed"
          practitioner={currentPractitioner!}
        />
      </div>
      <div ref={acceptAdminModalRef}>
        <AcceptAdmin
          container={acceptAdminModalContainer!}
          title="Successful!"
        />
      </div>
      <div ref={deniedAdminModalRef}>
        <DeniedAdminModal
          container={deniedAdminModalContainer!}
          title="Access Denied"
        />
      </div>
    </div>
  );
};

export default DesignateRoles;
