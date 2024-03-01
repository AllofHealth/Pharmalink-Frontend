import Button from "@/components/button/Button";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import { useDispatch } from "react-redux";

const PharmacistEditMedicine = () => {
  const dispatch = useDispatch();
  const options = [
    { value: "Patient", label: "Patient" },
    { value: "Doctor", label: "Doctor" },
    { value: "Pharmacist", label: "Pharmacist" },
  ];
  return (
    <div>
      <div className="flex gap-4 items-center justify-between">
        <div>
          <h1 className="font-bold lg:text-2xl mb-2">
            Inventory &gt; List of Medicines &gt; Azithral 500 Tablet
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
              id="medicine_name"
              type="text"
              className="bg-blue7 h-10 resize-none rounded-md mb-4 max-w-[705px]"
            />
          </Field>
          <Field label="Medicine ID">
            <Input
              id="medicine_id"
              type="text"
              className="bg-blue7 h-10 resize-none rounded-md mb-4 max-w-[705px]"
            />
          </Field>
        </div>
        <div className="grid gap-4 lg:flex lg:gap-8">
          <Field label="Medicine Group">
            <Select
              options={options}
              placeholder="Select Medicine Group"
              className="bg-blue7 h-10 resize-none rounded-md mb-4 max-w-[705px]"
            />
          </Field>
          <Field label="Quantity in Number">
            <Input
              id="medicine_id"
              type="text"
              className="bg-blue7 h-10 resize-none rounded-md mb-4 max-w-[705px]"
            />
          </Field>
        </div>
        <Field label="How to Use">
          <textarea className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px]" />
        </Field>
        <Field label="Side Effects">
          <textarea className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px]" />
        </Field>
        <Button variant="secondary" className="mx-auto">
          {" "}
          Save details
        </Button>
      </div>
    </div>
  );
};

export default PharmacistEditMedicine;
