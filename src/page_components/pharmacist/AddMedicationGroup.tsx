import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import useAxios from "@/lib/hooks/useAxios";
import { addNewMedicationGroup } from "@/lib/mutations/medicine";
import { useState } from "react";

const AddMedicationGroup = () => {
  const { axios } = useAxios({});
  const [newMedicineGroup, setNewMedicineGroup] = useState("");

  return (
    <div className="w-[90%]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold lg:text-3xl">Add New Medicine Group</h1>
      </div>

      <div className="mb-8">
        <Field
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Name of Medicine Group
            </span>
          }
        >
          <Input
            id={`name`}
            name="name"
            value={newMedicineGroup}
            placeholder="E.g Antibiotics"
            className="h-14 mb-6"
            onChange={(e) => setNewMedicineGroup(e.target.value)}
          />
        </Field>
      </div>

      <Button
        variant="primary"
        className="mx-auto"
        disabled={!newMedicineGroup}
        onClick={() => {
          addNewMedicationGroup({
            axios,
            category: newMedicineGroup,
          });
        }}
      >
        Add Medication Group
      </Button>
    </div>
  );
};

export default AddMedicationGroup;
