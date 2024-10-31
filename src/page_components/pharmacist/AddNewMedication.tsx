import Button from "@/components/button/Button";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import useAxios from "@/lib/hooks/useAxios";
import { addNewMedication } from "@/lib/mutations/pharmacist";
import { useGetAllMedicinesCategory } from "@/lib/queries/medicine";
import { useState } from "react";
import type { SingleValue } from "react-select";
import { useAccount } from "wagmi";

type OptionType = {
  value: string;
  label: string;
};

const AddNewMedication = () => {
  const { address } = useAccount();
  const { axios } = useAxios({});
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    price: 0,
    quantity: 0,
    sideEffects: "",
    category: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewMedicine({
      ...newMedicine,
      [name]: value,
    });
  };

  const { medicinesCategory, loading } = useGetAllMedicinesCategory();
  const medicinesCategoryOptions: OptionType[] =
    medicinesCategory?.map((medicineCategory: string) => ({
      value: medicineCategory,
      label: medicineCategory,
    })) ?? [];

  const isFormValid =
    newMedicine.name &&
    newMedicine.price &&
    newMedicine.category &&
    newMedicine.quantity &&
    newMedicine.sideEffects;

  return (
    <div className="w-[90%]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold lg:text-3xl">Add New Medicine</h1>
      </div>

      <div className="mb-8">
        <Field
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Name of Medicine
            </span>
          }
        >
          <Input
            id={`name`}
            name="name"
            value={newMedicine.name}
            placeholder="E.g Ampliclox"
            className="h-14 mb-6"
            onChange={handleInputChange}
          />
        </Field>
        <Field
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Price of Medicine
            </span>
          }
        >
          <Input
            id={`price`}
            name="price"
            value={newMedicine.price}
            placeholder="E.g 1500"
            className="h-14 mb-6"
            onChange={handleInputChange}
            type="number"
          />
        </Field>
        <div className="mb-6">
          <Field
            label={
              <span className="text-[18px] font-normal text-text-black2">
                Category of Medicine
              </span>
            }
          >
            <Select
              options={medicinesCategoryOptions}
              placeholder="Select product category"
              // value={{
              //   label: medicine.productCategory,
              //   value: medicine.productCategory,
              // }}
              onChange={(
                selectedOption: SingleValue<{
                  label: string;
                  value: string;
                }>
              ) =>
                setNewMedicine({
                  ...newMedicine,
                  category: selectedOption?.value ?? "",
                })
              }
            />
          </Field>
        </div>
        <Field
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Qty of Medicine
            </span>
          }
        >
          <Input
            id={`quantity`}
            name="quantity"
            value={newMedicine.quantity}
            placeholder="E.g 5"
            className="h-14 mb-6"
            onChange={handleInputChange}
            type="number"
          />
        </Field>

        <Field
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Side Effects
            </span>
          }
        >
          <textarea
            id={`sideEffects`}
            name="sideEffects"
            className="h-20 border rounded-md max-w-[705px] w-full mb-8 p-4"
            value={newMedicine.sideEffects}
            onChange={handleInputChange}
            placeholder="E.g If you have allergies, don't use."
          />
        </Field>
      </div>

      <Button
        variant="primary"
        className="mx-auto"
        disabled={!isFormValid}
        onClick={() =>
          addNewMedication({
            axios,
            address: address ? address : "",
            newMedication: newMedicine,
          })
        }
      >
        Add Medication
      </Button>
    </div>
  );
};

export default AddNewMedication;
