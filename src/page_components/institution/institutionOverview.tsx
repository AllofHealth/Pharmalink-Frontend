import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { Icon } from "@/components/icon/Icon";
import InstitutionAccessDeniedModal from "@/components/modal/Institution/AccessDeniedModal";
import InstitutionActionNeededRoleModal from "@/components/modal/Institution/ActionNeededRoleModal";
import InstitutionSuccessfullyAddedModal from "@/components/modal/Institution/SuccessfullyAddedModal";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleInstitutionActionNeededModal } from "@/lib/redux/slices/modals/modalSlice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InstitutionOverview = () => {
  const institutions = [
    {
      name: "Pharm Nicci Troiani",
      city: "Akoka",
      mobileNumber: "+2348109273871",
      walletAddress: "x647837",
      status: "Pending",
    },
    {
      name: "Pharm Nicci Troiani",
      city: "Akoka",
      mobileNumber: "+2348109273871",
      walletAddress: "x647837",
      status: "Pending",
    },
    {
      name: "Pharm Nicci Troiani",
      city: "Akoka",
      mobileNumber: "+2348109273871",
      walletAddress: "x647837",
      status: "Pending",
    },
    {
      name: "Pharm Nicci Troiani",
      city: "Akoka",
      mobileNumber: "+2348109273871",
      walletAddress: "x647837",
      status: "Pending",
    },
    {
      name: "Pharm Nicci Troiani",
      city: "Akoka",
      mobileNumber: "+2348109273871",
      walletAddress: "x647837",
      status: "Pending",
    },
    {
      name: "Pharm Nicci Troiani",
      city: "Akoka",
      mobileNumber: "+2348109273871",
      walletAddress: "x647837",
      status: "Pending",
    },
  ];

  const actionNeededModalRef = useRef<HTMLDivElement | null>(null);
  const [actionNeededModalContainer, setActionNeededModalContainer] =
    useState<HTMLElement | null>(null);
  const successfullyAddedModalRef = useRef<HTMLDivElement | null>(null);
  const [successfullyAddedModalContainer, setSuccessfullyAddedModalContainer] =
    useState<HTMLElement | null>(null);
  const accessDeniedModalRef = useRef<HTMLDivElement | null>(null);
  const [accessDeniedModalContainer, setAccessDeniedModalContainer] =
    useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const isActionNeededModalOpen = useSelector(
    (state: RootState) => state.modal.isInstitutionActionNeededModalOpen
  );
  const isSuccessfullyAddedModalOpen = useSelector(
    (state: RootState) => state.modal.isSuccessfullyAddedModalOpen
  );
  const isAccessDeniedModalOpen = useSelector(
    (state: RootState) => state.modal.isAccessDeniedModalOpen
  );

  const handleToggleActionNeeded = () => {
    dispatch(toggleInstitutionActionNeededModal());
  };

  useEffect(() => {
    if (actionNeededModalRef.current) {
      setActionNeededModalContainer(actionNeededModalRef.current);
    }
    if (successfullyAddedModalRef.current) {
      setSuccessfullyAddedModalContainer(successfullyAddedModalRef.current);
    }
    if (accessDeniedModalRef.current) {
      setAccessDeniedModalContainer(accessDeniedModalRef.current);
    }
  }, [
    isActionNeededModalOpen,
    isSuccessfullyAddedModalOpen,
    isAccessDeniedModalOpen,
  ]);
  return (
    <section>
      <span className="bg-gray-6 h-10 rounded-lg py-2 px-8">Not Verified</span>
      <div className="my-4">
        <span className="text-base font-bold lg:text-3xl lg:font-extrabold">
          Welcome, Balablue Maternity Hospital
        </span>
        <p className="text-xs lg:text-base text-gray-7 my-2">
          Have a nice day at work today!
        </p>
      </div>
      <div className="bg-gradient-to-r from-[#00758A] via-[#47CDD4] to-[#017489] flex justify-between rounded-2xl pl-4 mb-4 lg:pl-20">
        <div className="py-4 pr-2 h-max lg:pt-10">
          <div className="flex items-center gap-4 mb-4 lg:mb-8">
            <Icon name="Asset" />
            <div>
              <span className="text-base font-medium lg:text-2xl text-white">
                Total assets
              </span>
              <p className="text-2xl lg:text-[40px] font-bold text-white">
                $ 87.743
              </p>
            </div>
          </div>
          <div className="lg:flex lg:gap-4 ">
            <div className="bg-blue5 px-10 py-1 lg:py-4 rounded-2xl mb-4 lg:mb-0">
              <p className="text-xs lg:text-[18px] mb-4">Total Doctors</p>
              <span className="text-[20px] lg:text-4xl">20</span>
            </div>
            <div className="bg-blue5 px-10 py-1 lg:py-4 rounded-2xl mb-4 lg:mb-0">
              <p className="text-xs lg:text-[18px] mb-4">Total Pharmacist</p>
              <span className="text-[20px] lg:text-4xl">40</span>
            </div>
          </div>
        </div>
        <Image
          src="/assets/images/emergency.png"
          alt="An Emergency poster"
          width={391}
          height={328}
          className="rounded-tr-2xl rounded-br-2xl w-2/5"
        />
      </div>
      <AllOfHealthTable
        labels={[
          "Practitioner’s Name",
          "City",
          "Mobile Number",
          "Wallet Address",
          "Status",
          "Action",
        ]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {institutions.map((institution, index) => (
          <tr
            className="h-16 text-blue4 font-medium"
            key={index}
            onClick={() => handleToggleActionNeeded()}
          >
            <td className="pl-2 lg:pl-7 text-xs lg:text-base">
              {institution.name}
            </td>
            <td className=" text-xs lg:text-base">{institution.city}</td>
            <td className=" text-xs lg:text-base">
              {institution.mobileNumber}
            </td>
            <td className=" text-xs lg:text-base">
              {institution.walletAddress}
            </td>
            <td className=" text-xs lg:text-base">{institution.status}</td>
            <td>
              <Icon name="Ellipse" className="mx-auto" />
            </td>
          </tr>
        ))}
      </AllOfHealthTable>
      <div ref={actionNeededModalRef}>
        <InstitutionActionNeededRoleModal
          container={actionNeededModalContainer!}
          title="Action Needed"
        />
      </div>
      <div ref={successfullyAddedModalRef}>
        <InstitutionSuccessfullyAddedModal
          container={successfullyAddedModalContainer!}
          title="Successfully added"
        />
      </div>
      <div ref={accessDeniedModalRef}>
        <InstitutionAccessDeniedModal
          container={accessDeniedModalContainer!}
          title="Access Denied"
        />
      </div>
    </section>
  );
};

export default InstitutionOverview;
