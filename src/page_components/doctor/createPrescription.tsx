import Button from "@/components/button/Button";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import useAxios from "@/lib/hooks/useAxios";
import { addMedicinePrescription } from "@/lib/mutations/doctor";
import { useGetAllMedicinesCategory } from "@/lib/queries/medicine";
import type { RootState } from "@/lib/redux/rootReducer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { SingleValue } from "react-select";
import { useAccount } from "wagmi";

export interface PrescriptionMedicine {
  productPrescribed: string;
  productCategory: string;
  productDosage: string;
  practitionerNote: string;
}

type OptionType = {
  value: string;
  label: string;
};

const CreatePrescription = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    {
      productPrescribed: "",
      productCategory: "",
      productDosage: "",
      practitionerNote: "",
    },
  ]);
  const dispatch = useDispatch();
  const { axios } = useAxios({});
  const { address } = useAccount();
  const patientAddress = useSelector(
    (state: RootState) => state.doctor.currentPatientAddress
  );
  const record = useSelector(
    (state: RootState) => state.doctor.currentPatientRecord
  );
  console.log(medicines);

  // Handle adding a new medicine form
  const addNewDrug = () => {
    setMedicines([
      ...medicines,
      {
        productPrescribed: "",
        productCategory: "",
        productDosage: "",
        practitionerNote: "",
      },
    ]);
  };

  // Handle changes to the medicine inputs
  const handleInputChange = (
    index: number,
    field: keyof PrescriptionMedicine,
    value: string
  ) => {
    const updatedMedicines = medicines.map((medicine, i) =>
      i === index ? { ...medicine, [field]: value } : medicine
    );
    setMedicines(updatedMedicines);
  };

  // Function to handle removing a drug from the list
  const handleRemoveDrug = (index: number) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const { medicinesCategory, loading } = useGetAllMedicinesCategory();

  const medicinesCategoryOptions: OptionType[] =
    medicinesCategory?.map((medicineCategory: string) => ({
      value: medicineCategory,
      label: medicineCategory,
    })) ?? [];

  const isFormValid = () => {
    return medicines.every(
      (medicine) =>
        medicine.productPrescribed &&
        medicine.productCategory &&
        medicine.productDosage &&
        medicine.practitionerNote
    );
  };

  const addPatientPrescription = async () => {
    try {
      await addMedicinePrescription({
        axios,
        patientAddress: record?.recordOwner,
        doctorAddress: address ? address : "",
        prescription: medicines,
        recordId: record?.recordId ?? 0,
        dispatch,
      });
      setMedicines([
        {
          productPrescribed: "",
          productCategory: "",
          productDosage: "",
          practitionerNote: "",
        },
      ]);
    } catch (error) {
      console.error("Error adding prescription medicine:", error);
    }
  };

  return (
    <div className="w-[90%]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold lg:text-3xl">Add Prescription/Medicines</h1>
        <Button
          variant="secondary"
          type="button"
          className="w-max rounded-sm h-14 text-xl font-normal"
          onClick={addNewDrug}
        >
          Add New Drug
        </Button>
      </div>

      {loading ? (
        <> Error fetching medicine category data...</>
      ) : (
        <>
          {medicines.map((medicine, index) => (
            <div key={index} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Medicine {index + 1}</h2>
                <Button
                  variant="wallet"
                  type="button"
                  onClick={() => handleRemoveDrug(index)}
                  className="text-sm text-white"
                >
                  Cancel
                </Button>
              </div>
              <Field
                label={
                  <span className="text-[18px] font-normal text-text-black2">
                    Name of medicine prescribed
                  </span>
                }
              >
                <Input
                  id={`productPrescribed-${index}`}
                  name="productPrescribed"
                  value={medicine.productPrescribed}
                  placeholder="E.g Ampliclox"
                  className="h-14 mb-6"
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "productPrescribed",
                      e.target.value
                    )
                  }
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
                    value={{
                      label: medicine.productCategory,
                      value: medicine.productCategory,
                    }}
                    onChange={(
                      selectedOption: SingleValue<{
                        label: string;
                        value: string;
                      }>
                    ) => {
                      handleInputChange(
                        index,
                        "productCategory",
                        selectedOption ? selectedOption.value : ""
                      );
                    }}
                  />
                </Field>
              </div>

              <Field
                label={
                  <span className="text-[18px] font-normal text-text-black2">
                    Dosage of medicine
                  </span>
                }
              >
                <Input
                  id={`productDosage-${index}`}
                  name="productDosage"
                  value={medicine.productDosage}
                  placeholder="E.g 200mmg"
                  className="h-14 mb-6"
                  onChange={(e) =>
                    handleInputChange(index, "productDosage", e.target.value)
                  }
                />
              </Field>
              <Field
                label={
                  <span className="text-[18px] font-normal text-text-black2">
                    Practitioner&apos;s Note
                  </span>
                }
              >
                <textarea
                  id={`practitionerNote-${index}`}
                  className="h-20 border rounded-md max-w-[705px] w-full mb-8 p-4"
                  value={medicine.practitionerNote}
                  onChange={(e) =>
                    handleInputChange(index, "practitionerNote", e.target.value)
                  }
                  placeholder="E.g 200mg precisely must be prescribed"
                />
              </Field>
            </div>
          ))}
        </>
      )}

      <Button
        variant="primary"
        className=" mx-auto"
        disabled={!isFormValid()}
        onClick={() => addPatientPrescription()}
      >
        Add Prescription
      </Button>
    </div>
  );
};

export default CreatePrescription;
