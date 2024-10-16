import { addMedicalRecord } from "@/actions/contract/doctor/doctor.service.c";
import type {
  RecordInterface,
  UploadImageInterface,
} from "@/actions/interfaces/Record/app.record.interface";
import { uploadRecordToIpfs } from "@/actions/shared/utils/upload.to.ipfs";
import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { Icon } from "@/components/icon/Icon";
import useAxios from "@/lib/hooks/useAxios";
import { createMedicalRecord } from "@/lib/mutations/doctor";
import { useGetDoctorByAddress } from "@/lib/queries/auth";
import type { RootState } from "@/lib/redux/rootReducer";
import { setDoctorCurrentTab } from "@/lib/redux/slices/doctor/doctorSlice";
import type {
  GetDoctorMessage,
  Record,
  VerificationDocuments,
} from "@/lib/types";
import {} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/router";
import { useEffect, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const EditPatientMedicalRecord = () => {
  const { isConnected, address } = useAccount();
  const { axios } = useAxios({});
  const dispatch = useDispatch();

  const {
    loading: loadingDoctorData,
    doctorData,
    error: errorDoctorData,
  } = useGetDoctorByAddress({
    connected: isConnected,
    address: address ? address : "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");
  const [medicalRecordId, setMedicalRecordId] = useState(0);
  const [record, setRecord] = useState<Record>({
    diagnosis: "",
    description: "",
    testname: "",
    referenceRange: "",
    units: "",
    comments: "",
    heartbeat: "",
    bloodPressure: "",
    sugarLevel: "",
    haemoglobin: "",
    labImages: [],
  });
  const patientCurrentRecord = useSelector(
    (state: RootState) => state.doctor.currentPatientRecord
  );

  console.log(record);

  const handleChangeRecordValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRecord({
      ...record,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray: UploadImageInterface[] = Array.from(files).map(
        (file) => ({
          image: file,
        })
      );
      console.log(fileArray);
      setRecord((prevRecord) => ({
        ...prevRecord,
        labImages: [...prevRecord.labImages, ...fileArray], // Append new files to existing ones
      }));
    }
  };

  const patientRecord: RecordInterface = {
    diagnosis: record.diagnosis,
    content: record.description,
    doctorsName: (doctorData as GetDoctorMessage)?.doctor?.name,
    hospitalName: `${(doctorData as GetDoctorMessage)?.doctor?.hospitalIds[0]}`,
    labResults: {
      testName: record.testname,
      referenceRange: record.referenceRange,
      units: record.units,
      comments: record.comments,
    },
    generalReport: {
      heartBeat: record.heartbeat,
      bloodPressure: record.bloodPressure,
      sugarLevel: record.sugarLevel,
      haemoglobin: record.haemoglobin,
    },
    date: new Date(Date.now()),
  };

  // Step 1: Upload patient record to IPFS
  const uploadPatientRecord = async () => {
    try {
      setIsLoading(true);
      const cid = await uploadRecordToIpfs(patientRecord);
      setIpfsHash(cid); // Set the IPFS hash
      console.log(cid);
    } catch (error) {
      console.error("Error uploading record:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Call when ipfsHash changes
  useEffect(() => {
    const doctorToAddMedicalRecord = async () => {
      if (ipfsHash) {
        try {
          const medicalRecord = await addMedicalRecord({
            patientAddress: patientCurrentRecord?.recordOwner ?? "",
            patientId: patientCurrentRecord?.patientId ?? 0,
            ipfsHash,
          });
          setMedicalRecordId(medicalRecord.medicalRecordId); // Set the medical record ID
        } catch (error) {
          console.error("Error adding medical record:", error);
        }
      }
    };
    doctorToAddMedicalRecord();
  }, [ipfsHash]); // Runs when ipfsHash is updated

  console.log(medicalRecordId);

  // Step 3: Call when medicalRecordId changes
  useEffect(() => {
    const sendMedicalRecordToDB = async () => {
      if (medicalRecordId) {
        try {
          await createMedicalRecord({
            axios,
            patientAddress: patientCurrentRecord?.recordOwner ?? "",
            doctorAddress: address ?? "",
            recordId: medicalRecordId,
            medicalRecordValues: {
              diagnosis: record.diagnosis,
              medication: "",
              products: "",
            },
            dispatch,
          });
          dispatch(setDoctorCurrentTab("CreatePrescription"));
        } catch (error) {
          console.error("Error saving record to DB:", error);
        }
      }
    };
    sendMedicalRecordToDB();
  }, [medicalRecordId]); // Runs when medicalRecordId is updated

  return (
    <div>
      <h1
        className="font-bold lg:text-3xl mb-6"
        onClick={() => dispatch(setDoctorCurrentTab("CreatePrescription"))}
      >
        Add to Patient Record
      </h1>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            DIAGNOSIS
          </span>
        }
      >
        <textarea
          name="diagnosis"
          value={record.diagnosis}
          onChange={handleChangeRecordValue}
          className="h-24 border rounded-md max-w-[705px] w-full mb-8 p-2"
        />
      </Field>
      <Field
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Description of the medical pattern
          </span>
        }
      >
        <textarea
          name="description"
          value={record.description}
          onChange={handleChangeRecordValue}
          className="h-24 border rounded-md max-w-[705px] w-full mb-8 p-2"
        />
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
          name="testname"
          value={record.testname}
          onChange={handleChangeRecordValue}
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
          name="referenceRange"
          value={record.referenceRange}
          onChange={handleChangeRecordValue}
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
          name="units"
          value={record.units}
          onChange={handleChangeRecordValue}
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
          name="comments"
          value={record.comments}
          onChange={handleChangeRecordValue}
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
          name="heartbeat"
          value={record.heartbeat}
          onChange={handleChangeRecordValue}
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
          name="bloodPressure"
          value={record.bloodPressure}
          onChange={handleChangeRecordValue}
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
          name="sugarLevel"
          value={record.sugarLevel}
          onChange={handleChangeRecordValue}
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
          name="haemoglobin"
          value={record.haemoglobin}
          onChange={handleChangeRecordValue}
        />
      </Field>

      <label className="mb-2 font-bold text-2xl">Add Images</label>
      <div className="relative border-2 border-dashed bg-[#F8F8FF] border-blue2 rounded-lg p-4 mb-4 text-center cursor-pointer max-w-[556px]">
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png, image/gif"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        {record?.labImages?.length && record.labImages.length > 0 ? (
          <>
            <div>
              {record.labImages.map((file, index) => (
                <p key={index} className="text-sm text-green-600">
                  {file.image.name} Image Uploaded
                </p>
              ))}
            </div>
            <Icon name="Upload" className="mx-auto" />

            <p>Drag & drop files or Browse/ Upload More</p>
          </>
        ) : record?.labImages && record.labImages.length === 0 ? (
          <div className="my-4">
            <Icon name="Upload" className="mx-auto" />
            <p>Drag & drop files or Browse</p>
            <p>Supported formats: JPEG, PNG, GIF, MP4, PDF, etc.</p>
          </div>
        ) : null}
      </div>

      <Button
        variant="secondary"
        type="submit"
        className="w-max rounded-[40px] mt-10 h-14 justify-center mx-auto items-center text-xl font-normal"
        onClick={() => uploadPatientRecord()}
      >
        {isLoading ? "Loading..." : "Save details"}
      </Button>
    </div>
  );
};

export default EditPatientMedicalRecord;
