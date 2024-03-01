import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { CheckBox } from "@/components/common/forms/checkbox";
import GrantAccessToSpecificRecordsModal from "@/components/modal/patient/grantAccessToSpecificRecordsModal";
import SuccessfullyGrantedAccessToSpecificRecordsModal from "@/components/modal/patient/successfulyGrantedAccessToSpecificRecords";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleGrantAccessToSpecificRecordsModal } from "@/lib/redux/slices/modals/modalSlice";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PharmacistListOfMedicines = () => {
  const recordLists = [
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
    {
      medicineName: "Augmentin 625 Duo Tablet",
      medicineId: "123456",
      groupName: "Antibiotics",
      stockInQty: "20",
    },
  ];

  const dispatch = useDispatch();
  return (
    <div className="">
      <div className="flex gap-4 items-center justify-between">
        <div>
          <h1 className="font-bold lg:text-3xl mb-2">
            Inventory &gt; List of Medicines (298)
          </h1>
          <p className="text-xs lg:text-xl text-gray-7 mb-2">
            List of medicines available for sales.
          </p>
        </div>
        <Field id="approval" label="">
          <Input
            id="approval"
            type="search"
            name="approval"
            placeholder="Search"
            className="h-10 w-20 lg:w-auto text-[10px] lg:text-sm"
          />
        </Field>
        <Button variant="primary" className="text-[8px] lg:text-sm max-h-11">
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
        {recordLists.map((medicine, index) => (
          <tr
            className="h-16 text-blue4 font-medium"
            key={index}
            onClick={() => dispatch(setPharmacistCurrentTab("Medicine Detail"))}
          >
            <td className="pl-2 lg:pl-7 text-xs lg:text-base">
              {medicine.medicineName}
            </td>
            <td className=" text-xs lg:text-base">{medicine.medicineId}</td>
            <td className=" text-xs lg:text-base">{medicine.groupName}</td>
            <td className=" text-xs lg:text-base">{medicine.stockInQty}</td>
            <td className=" text-xs lg:text-base">View Full Detail &gt;&gt;</td>
          </tr>
        ))}
      </AllOfHealthTable>
    </div>
  );
};

export default PharmacistListOfMedicines;
