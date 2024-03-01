import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import AccessGrantedSharePrescriptionModal from "@/components/modal/patient/accessGrantedSharePrescription";
import ActionNeededSharePrescription from "@/components/modal/patient/actionNeededSharePrescription";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleActionNeededSharePrescription } from "@/lib/redux/slices/modals/modalSlice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FindPharmacist = () => {
  const pharmacists = [
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
    {
      pharmacistName: "Pharm. Nicci Troiani",
      pharmacistIdNo: "98745120JIKUYA",
      institution: "Hadas Institution",
      status: "Online",
    },
  ];

  const actionNeededSharePrescriptionRef = useRef<HTMLDivElement | null>(null);
  const [
    actionNeededSharePrescriptionContainer,
    setActionNeededSharePrescriptionContainer,
  ] = useState<HTMLElement | null>(null);
  const accessGrantedSharePrescriptionRef = useRef<HTMLDivElement | null>(null);
  const [
    accessGrantedSharePrescriptionContainer,
    setAccessGrantedSharePrescriptionContainer,
  ] = useState<HTMLElement | null>(null);

  const dispatch = useDispatch();

  const isActionNeededSharePrescriptionModalOpen = useSelector(
    (state: RootState) => state.modal.isActionNeededSharePrescriptionModalOpen
  );
  const isAccessGrantedPrescriptionModalOpen = useSelector(
    (state: RootState) => state.modal.isAccessGrantedSharePrescriptionModalOpen
  );

  const handleToggleActionNeeded = () => {
    dispatch(toggleActionNeededSharePrescription());
  };

  useEffect(() => {
    if (actionNeededSharePrescriptionRef.current) {
      setActionNeededSharePrescriptionContainer(
        actionNeededSharePrescriptionRef.current
      );
    }
    if (accessGrantedSharePrescriptionRef.current) {
      setAccessGrantedSharePrescriptionContainer(
        accessGrantedSharePrescriptionRef.current
      );
    }
  }, [
    isActionNeededSharePrescriptionModalOpen,
    isAccessGrantedPrescriptionModalOpen,
  ]);
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold lg:text-3xl lg:mb-6">Find Pharmacist</h1>
        <Field id="approval" label="">
          <Input
            id="approval"
            type="search"
            name="approval"
            placeholder="Search"
            className="h-10 w-20 lg:w-auto"
          />
        </Field>
      </div>

      <AllOfHealthTable
        labels={["Pharm name", "Pharm Id", "Institution", "Status"]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {pharmacists.map((pharmacist, index) => (
          <tr
            className="h-16 text-blue4 font-medium"
            key={index}
            onClick={() => handleToggleActionNeeded()}
          >
            <td className="pl-2 lg:pl-7 text-xs lg:text-base flex gap-2 items-center mt-4">
              <h3>
                <Image
                  src="/assets/images/avatar.png"
                  alt="Memoji"
                  width={32}
                  height={32}
                  className="lg:w-16 lg:h-16"
                />
              </h3>
              {pharmacist.pharmacistName}
            </td>
            <td className=" text-xs lg:text-base">
              {pharmacist.pharmacistIdNo}
            </td>
            <td className=" text-xs lg:text-base">{pharmacist.institution}</td>
            <td className=" text-xs lg:text-base">{pharmacist.status}</td>
          </tr>
        ))}
      </AllOfHealthTable>
      <div ref={actionNeededSharePrescriptionRef}>
        <ActionNeededSharePrescription
          container={actionNeededSharePrescriptionContainer!}
          title="Action Needed"
        />
      </div>
      <div ref={accessGrantedSharePrescriptionRef}>
        <AccessGrantedSharePrescriptionModal
          container={accessGrantedSharePrescriptionContainer!}
          title="Access Granted"
        />
      </div>
    </div>
  );
};

export default FindPharmacist;
