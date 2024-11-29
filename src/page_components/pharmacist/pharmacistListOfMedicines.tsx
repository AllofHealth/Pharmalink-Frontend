import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { CheckBox } from "@/components/common/forms/checkbox";
import GrantAccessToSpecificRecordsModal from "@/components/modal/patient/grantAccessToSpecificRecordsModal";
import SuccessfullyGrantedAccessToSpecificRecordsModal from "@/components/modal/patient/successfulyGrantedAccessToSpecificRecords";
import { useGetInventory } from "@/lib/queries/pharmacist";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleGrantAccessToSpecificRecordsModal } from "@/lib/redux/slices/modals/modalSlice";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import {
  setCurrentMedicine,
  setCurrentMedicineIndex,
  setPharmacistCurrentTab,
} from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import type { Medicine, Product } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const PharmacistListOfMedicines = () => {
  const { address } = useAccount();

  const { loading, inventory, error } = useGetInventory({
    walletAddress: address ? address : "",
  });

  const dispatch = useDispatch();

  const handleViewMedicine = (medicine: Product, index: number) => {
    dispatch(setPharmacistCurrentTab("Medicine Detail"));
    dispatch(setCurrentMedicine(medicine));
    dispatch(setCurrentMedicineIndex(index));
  };

  const totalMedications = inventory?.inventory?.products.reduce(
    (total, product) => total + product.medications.length,
    0
  );

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : inventory ? (
        <>
          <div className="flex gap-4 items-center justify-between">
            <div>
              <h1 className="font-bold lg:text-3xl mb-2">
                Inventory &gt; List of Medicines ({totalMedications})
              </h1>
              <p className="text-xs lg:text-xl text-gray-7 mb-2">
                List of medicines available for sales.
              </p>
            </div>
            {/* <Field id="approval" label="">
              <Input
                id="approval"
                type="search"
                name="approval"
                placeholder="Search"
                className="h-10 w-20 lg:w-auto text-[10px] lg:text-sm"
              />
            </Field> */}
            <Button
              variant="primary"
              className="text-[8px] lg:text-sm max-h-11"
              onClick={() => dispatch(setPharmacistCurrentTab("Medication"))}
            >
              + Add New Item
            </Button>
          </div>

          <AllOfHealthTable
            labels={[
              "Medicine Name",
              "Medicine ID",
              "Group Name",
              "Stock in Qty",
              "Action",
            ]}
            caption="Approve Institution Table"
            headClassName="bg-gray-5 rounded-t-md"
          >
            {inventory?.inventory?.products?.map((product) =>
              product.medications.map((medicine, index) => (
                <tr
                  className="h-16 text-blue4 font-medium"
                  key={index}
                  onClick={() => handleViewMedicine(product, index)}
                >
                  <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                    {medicine.name}
                  </td>
                  <td className="text-xs lg:text-base">{medicine._id}</td>
                  <td className="text-xs lg:text-base">{product.category}</td>
                  <td className="text-xs lg:text-base">{medicine.quantity}</td>
                  <td className="text-xs lg:text-base">
                    View Full Detail &gt;&gt;
                  </td>
                </tr>
              ))
            )}
          </AllOfHealthTable>
        </>
      ) : error ? (
        <p>Error fetching data...</p>
      ) : null}
    </div>
  );
};

export default PharmacistListOfMedicines;
