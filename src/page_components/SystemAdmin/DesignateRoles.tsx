import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import AcceptAdmin from "@/components/modal/SystemAdmin/AcceptAdmin";
import ActionNeededRoleModal from "@/components/modal/SystemAdmin/ActionNeededRoleModal";
import DeniedAdminModal from "@/components/modal/SystemAdmin/DeniedAdmin";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleActionNeededRoleModal } from "@/lib/redux/slices/modals/modalSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DesignateRoles = () => {
  const institutions = [
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
    {
      practitionersName: "John Doe",
      city: "Ibadan",
      walletAddress: "x647837",
      phoneNumber: "+2348109273871",
    },
  ];
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

  const handleToggleActionNeeded = () => {
    dispatch(toggleActionNeededRoleModal());
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

  return (
    <div>
      <h1
        className="font-bold lg:text-3xl mb-6"
        onClick={() => handleToggleActionNeeded()}
      >
        Designate Roles
      </h1>
      <AllOfHealthTable
        labels={[
          "Practitioner's Name Name",
          "City",
          "Wallet Address",
          "Phone Number",
        ]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {institutions.map((institution, index) => (
          <tr className="h-16 text-blue4 font-medium" key={index}>
            <td className="pl-2 lg:pl-7 text-xs lg:text-base">
              {institution.practitionersName}
            </td>
            <td className=" text-xs lg:text-base">{institution.city}</td>
            <td className=" text-xs lg:text-base">
              {institution.walletAddress}
            </td>
            <td className=" text-xs lg:text-base">{institution.phoneNumber}</td>
          </tr>
        ))}
      </AllOfHealthTable>
      <div ref={actionNeededModalRef}>
        <ActionNeededRoleModal
          container={actionNeededModalContainer!}
          title="Action Needed"
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
