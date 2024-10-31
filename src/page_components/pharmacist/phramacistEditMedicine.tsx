import Button from "@/components/button/Button";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import useAxios from "@/lib/hooks/useAxios";
import { updateMedicineDetails } from "@/lib/mutations/pharmacist";
import { useGetAllMedicinesCategory } from "@/lib/queries/medicine";
import type { RootState } from "@/lib/redux/rootReducer";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { SingleValue } from "react-select";
import { useAccount } from "wagmi";

type OptionType = {
  value: string;
  label: string;
};

const PharmacistEditMedicine = () => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { axios } = useAxios({});

  const medicine = useSelector(
    (state: RootState) => state.pharmacist.currentMedicine
  );
  const medicineIndex = useSelector(
    (state: RootState) => state.pharmacist.currentMedicineIndex
  );
  console.log(medicine);

  const [editMedicine, setEditMedicine] = useState({
    name: medicine?.medications[medicineIndex].name ?? "",
    price: medicine?.medications[medicineIndex].price ?? 0,
    medicineGroup: medicine?.category ?? "",
    quantity: medicine?.medications[medicineIndex].quantity ?? 0,
    description: medicine?.description ?? "",
    sideEffects: medicine?.medications[medicineIndex].sideEffects ?? "",
  });

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditMedicine({
      ...editMedicine,
      [name]: value,
    });
  };

  const { medicinesCategory, loading } = useGetAllMedicinesCategory();
  const medicinesCategoryOptions: OptionType[] =
    medicinesCategory?.map((medicineCategory: string) => ({
      value: medicineCategory,
      label: medicineCategory,
    })) ?? [];

  return (
    <div>
      <div className="flex gap-4 items-center justify-between">
        <div>
          <h1 className="font-bold lg:text-2xl mb-2">
            Inventory &gt; List of Medicines &gt;{" "}
            {medicine?.medications[medicineIndex].name}
          </h1>
          {/* <p className="text-xs lg:text-xl text-gray-7 mb-2">
            List of medicines available for sales.
          </p> */}
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
        <Button
          variant="primary"
          className="text-[8px] lg:text-sm max-h-11"
          onClick={() => dispatch(setPharmacistCurrentTab("Edit Medicine"))}
        >
          Edit details
        </Button>
      </div>
      <div>
        <div className="grid gap-4 lg:flex lg:gap-8">
          <Field label="Medicine Name">
            <Input
              id="Medicine Name"
              name="name"
              type="text"
              className="bg-blue7 h-10 resize-none rounded-md mb-4 max-w-[705px]"
              value={editMedicine.name}
              onChange={handleTextChange}
            />
          </Field>
          <Field label="Medicine Price">
            <Input
              id="Medicine Price"
              name="price"
              type="text"
              className="bg-blue7 h-10 resize-none rounded-md mb-4 max-w-[705px]"
              value={editMedicine.price}
              onChange={handleTextChange}
            />
          </Field>
        </div>
        <div className="grid gap-4 lg:flex lg:gap-8">
          <Field label="Medicine Group">
            <Select
              options={medicinesCategoryOptions}
              placeholder="Select product category"
              value={{
                label: editMedicine.medicineGroup,
                value: editMedicine.medicineGroup,
              }}
              onChange={(
                selectedOption: SingleValue<{
                  label: string;
                  value: string;
                }>
              ) =>
                setEditMedicine({
                  ...editMedicine,
                  medicineGroup: selectedOption?.value ?? "",
                })
              }
              className="bg-blue7 h-10 rounded-md mb-4 max-w-[705px]"
            />
          </Field>
          <Field label="Quantity in Number">
            <Input
              id="quantity"
              name="quantity"
              type="text"
              className="bg-blue7 h-10 resize-none rounded-md mb-4 max-w-[705px]"
              value={editMedicine.quantity}
              onChange={handleTextChange}
            />
          </Field>
        </div>
        <Field label="How to Use">
          <textarea
            className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px] p-4"
            name="description"
            value={editMedicine.description}
            onChange={handleTextChange}
          />
        </Field>
        <Field label="Side Effects">
          <textarea
            className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px] p-4"
            name="sideEffects"
            value={editMedicine.sideEffects}
            onChange={handleTextChange}
          />
        </Field>
        <Button
          variant="secondary"
          className="mx-auto"
          onClick={() =>
            updateMedicineDetails({
              axios,
              editMedicineValues: editMedicine,
              address,
              medicineId: medicine?.medications[medicineIndex]._id ?? "",
              productId: medicine?._id ?? "",
            })
          }
        >
          Save details
        </Button>
      </div>
    </div>
  );
};

export default PharmacistEditMedicine;
