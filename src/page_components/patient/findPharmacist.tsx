import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import AccessGrantedSharePrescriptionModal from "@/components/modal/patient/accessGrantedSharePrescription";
import ActionNeededSharePrescription from "@/components/modal/patient/actionNeededSharePrescription";
import { useGetAllPharmacists } from "@/lib/queries/pharmacist";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleActionNeededSharePrescription } from "@/lib/redux/slices/modals/modalSlice";
import type { AllPharmacist } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const FindPharmacist = () => {
  const { loading, pharmacists, error } = useGetAllPharmacists();
  const [currentPharmacist, setCurrentPharmacist] =
    useState<AllPharmacist | null>(null);

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

  const handleToggleActionNeeded = (pharmacist: AllPharmacist) => {
    dispatch(toggleActionNeededSharePrescription());
    setCurrentPharmacist(pharmacist);
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
      {loading ? (
        <BiLoaderAlt className="text-center text-xl mx-auto" />
      ) : pharmacists ? (
        <AllOfHealthTable
          labels={["Pharm name", "Pharm Id", "Institution", "Status"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {pharmacists.map((pharmacist) => (
            <tr
              className="h-16 text-blue4 font-medium"
              key={pharmacist._id}
              onClick={() => handleToggleActionNeeded(pharmacist)}
            >
              <td className="pl-2 lg:pl-7 text-xs lg:text-base flex gap-2 items-center mt-4">
                <h3>
                  <Image
                    src={pharmacist.profilePicture}
                    alt="Memoji"
                    width={32}
                    height={32}
                    className="lg:w-16 lg:h-16"
                  />
                </h3>
                {pharmacist.name}
              </td>
              <td className=" text-xs lg:text-base">{pharmacist.id}</td>
              <td className=" text-xs lg:text-base">{pharmacist.location}</td>
              <td className=" text-xs lg:text-base">{pharmacist.status}</td>
            </tr>
          ))}
        </AllOfHealthTable>
      ) : error ? (
        <p>Error fetching data...</p>
      ) : null}
      <div ref={actionNeededSharePrescriptionRef}>
        <ActionNeededSharePrescription
          container={actionNeededSharePrescriptionContainer!}
          title="Action Needed"
          pharmacist={currentPharmacist}
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
