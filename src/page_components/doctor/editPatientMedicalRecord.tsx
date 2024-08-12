import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { Icon } from "@/components/icon/Icon";
import type { VerificationDocuments } from "@/lib/types";
import {} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, type ChangeEvent } from "react";

const EditPatientMedicalRecord = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [verificationDocuments, setVerificationDocuments] = useState({
    identificationCard: "",
    medicalLicensce: "",
  });

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof VerificationDocuments
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setVerificationDocuments((prevDocs) => ({
        ...prevDocs,
        [field]: file.name,
      }));
    }
  };

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Add to Patient Record</h1>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            DIAGNOSIS
          </span>
        }
      >
        <textarea className="h-24 border rounded-md max-w-[705px] w-full mb-8" />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Description of the medical pattern
          </span>
        }
      >
        <textarea className="h-24 border rounded-md max-w-[705px] w-full mb-8" />
      </Field>

      <h3 className="text-2xl font-bold my-4">LAB RESULT</h3>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Test Name
          </span>
        }
        id="Test-name"
      >
        <Input
          type="text"
          placeholder=""
          className="max-w-[705px] mb-8"
          id="Test-name"
        />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Reference Range
          </span>
        }
        id="reference-range"
      >
        <Input
          type="text"
          placeholder="Reference range for the test"
          className="max-w-[705px] mb-8"
          id="reference-range"
        />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Units
          </span>
        }
        id="units"
      >
        <Input
          type="text"
          placeholder="Units"
          className="max-w-[705px] mb-8"
          id="units"
        />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Comments
          </span>
        }
        id="Comments"
      >
        <Input
          type="text"
          placeholder="Add a comment as to the lab result"
          className="max-w-[705px] mb-8"
          id="Test-name"
        />
      </Field>

      <h3 className="text-2xl font-bold my-4">General Report of the result</h3>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Heart Beat
          </span>
        }
        id="heart-beat"
      >
        <Input
          type="text"
          placeholder="20%"
          className="max-w-[705px] mb-8"
          id="heart-beat"
        />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Blood Pressure
          </span>
        }
        id="blood-pressure"
      >
        <Input
          type="text"
          placeholder="20%"
          className="max-w-[705px] mb-8"
          id="blood-pressure"
        />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Sugar Level
          </span>
        }
        id="Sugar-level"
      >
        <Input
          type="text"
          placeholder="20%"
          className="max-w-[705px] mb-8"
          id="Sugar-level"
        />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Haemoglobin
          </span>
        }
        id="haemoglobin"
      >
        <Input
          type="text"
          placeholder="20%"
          className="max-w-[705px] mb-8"
          id="haemoglobin"
        />
      </Field>

      <label className="mb-2 font-bold text-2xl">Add Images</label>
      <div className="relative border-2 border-dashed bg-[#F8F8FF] border-blue2 rounded-lg p-4 mb-4 text-center cursor-pointer max-w-[556px]">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFileChange(e, "identificationCard")}
        />
        {verificationDocuments.identificationCard ? (
          <p className="text-sm text-green-600">
            {verificationDocuments.identificationCard} Uploaded
          </p>
        ) : (
          <div className="my-4">
            <Icon name="Upload" className="mx-auto" />
            <p>Drag & drop files or Browse</p>
            <p>
              Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
          </div>
        )}
      </div>

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

export default EditPatientMedicalRecord;
