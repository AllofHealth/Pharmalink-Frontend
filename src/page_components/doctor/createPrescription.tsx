import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { useState } from "react";

const CreatePrescription = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-8">Add Prescription</h1>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Products to be Administered
          </span>
        }
      >
        <textarea className="h-24 border rounded-md max-w-[705px] w-full mb-8" />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Side Effects
          </span>
        }
      >
        <textarea className="h-24 border rounded-md max-w-[705px] w-full mb-8" />
      </Field>

      <Button
        variant="secondary"
        type="submit"
        className="w-max rounded-[40px] mt-8 h-14 justify-center mx-auto items-center text-xl font-normal"
      >
        {isLoading ? "Loading..." : "Save details"}
      </Button>
    </div>
  );
};

export default CreatePrescription;
