import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import SuccessfullyEditedMedicalRecordModal from "@/components/modal/doctor/SuccessFullyEditedMedicalRecordModal";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleSuccessfullyEditedMedicalRecordModal } from "@/lib/redux/slices/modals/modalSlice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewPatientMedicalRecord = () => {
  const labResult = [
    {
      testName: "Complete blood count",
      date: "2024-01-09",
      referenceRange: "4,000 - 11,000 cells/μL90%",
      units: "cells/μL",
      comments: "Within normal range",
    },
    {
      testName: "Complete blood count",
      date: "2024-01-09",
      referenceRange: "4,000 - 11,000 cells/μL90%",
      units: "cells/μL",
      comments: "Within normal range",
    },
  ];

  const otherInformation = [
    {
      categories: "SOCIAL HISTORY",
      details: "Non-, occasional alcohol-use",
    },
    {
      categories: "KNOWN ALLERGIES",
      details: "Lactose intolerant, ginger",
    },
    {
      categories: "OCCUPATIONAL HISTORY",
      details: "Office worker with no known occupational hazards",
    },
    {
      categories: "PERSON/FAMILY STRESSORS",
      details: "None",
    },
  ];

  const successfullyEditedMedicalRecordModalRef = useRef<HTMLDivElement | null>(
    null
  );
  const [
    successfullyEditedMedicalRecordModalContainer,
    setSuccessfullyEditedMedicalRecordModalContainer,
  ] = useState<HTMLElement | null>(null);

  const dispatch = useDispatch();
  const isSuccessfullyEditedMedicalRecordModalOpen = useSelector(
    (state: RootState) => state.modal.isSuccessfullyEditedMedicalRecordModalOpen
  );

  const handleToggleSuccessfullyEditedMedicalRecord = () => {
    dispatch(toggleSuccessfullyEditedMedicalRecordModal());
  };

  useEffect(() => {
    if (successfullyEditedMedicalRecordModalRef.current) {
      setSuccessfullyEditedMedicalRecordModalContainer(
        successfullyEditedMedicalRecordModalRef.current
      );
    }
  }, [isSuccessfullyEditedMedicalRecordModalOpen]);

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Patient Medical Record</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px] h-max">
          <Image
            src="/assets/images/patient_img.jpg"
            alt="Face card"
            width={94}
            height={94}
            className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
          />
          <div>
            <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
              Jay Vaughn
            </h3>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Role: </span>
              <span className="font-normal">Patient</span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Email: </span>
              <span className="font-normal">jayvaughn@gmail.com</span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">+23478219876 </span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Address: </span>
              <span className="font-normal">100, cross street, Calabar.</span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Age: </span>
              <span className="font-normal">35</span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Date of birth: </span>
              <span className="font-normal">12/09/1800</span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Blood Group:</span>
              <span className="font-normal">O+ </span>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <span className="font-bold">Genotype: </span>
              <span className="font-normal">AA </span>
            </div>
          </div>
        </article>
        <article className="flex flex-col gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 flex-1 h-max max-w-[430px]">
          <h3 className="text-xl lg:text-2xl mb-4 font-semibold">
            General Report
          </h3>
          <div className="flex flex-col gap-2 items-center mb-4">
            <span className="font-bold">Heartbeat: </span>
            <span className="font-normal">90% </span>
          </div>
          <div className="flex flex-col gap-2 items-center mb-4">
            <span className="font-bold">Blood Pressure: </span>
            <span className="font-normal">89% </span>
          </div>
          <div className="flex flex-col gap-2 items-center mb-4">
            <span className="font-bold">Sugar: </span>
            <span className="font-normal">90% </span>
          </div>
          <div className="flex flex-col gap-2 items-center mb-4">
            <span className="font-bold">Haemoglobin: </span>
            <span className="font-normal">90% </span>
          </div>
        </article>
      </div>
      <span className="text-base lg:text-2xl px-6 py-4 rounded-2xl h-14 lg:h-20 bg-gradient-to-b from-teal-55 to-gray-55 block w-max mb-8">
        DIAGNOSIS: MALARIA
      </span>
      <div>
        <h4 className="text-base lg:text-2xl mb-4">LAB RESULT</h4>
        <AllOfHealthTable
          labels={["Test Name", "Date", "Reference Range", "Units", "Comments"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {labResult.map((resultDetail, index) => (
            <tr className="h-16 text-blue4 font-medium" key={index}>
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {resultDetail.testName}
              </td>
              <td className=" text-xs lg:text-base">{resultDetail.date}</td>
              <td className=" text-xs lg:text-base">
                {resultDetail.referenceRange}
              </td>
              <td className=" text-xs lg:text-base">{resultDetail.units}</td>
              <td className=" text-xs lg:text-base">{resultDetail.comments}</td>
            </tr>
          ))}
        </AllOfHealthTable>
      </div>
      <div className="my-8">
        <h4 className="text-base lg:text-2xl mb-4">IMAGES</h4>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/lab_result_img.jpg"
              alt="Lab Image"
              width={376}
              height={414}
              className="rounded-[10px]"
            />
            <p className="text-xs lg:text-base">POST OP X-RAYS</p>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/lab_result_img.jpg"
              alt="Lab Image"
              width={376}
              height={414}
              className="rounded-[10px]"
            />
            <p className="text-xs lg:text-base">POST OP X-RAYS</p>
          </div>
          <div className="flex flex-col gap-4">
            <Image
              src="/assets/images/lab_result_img.jpg"
              alt="Lab Image"
              width={376}
              height={414}
              className="rounded-[10px]"
            />
            <p className="text-xs lg:text-base">POST OP X-RAYS</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-base lg:text-2xl mb-4">OTHER INFORMATION</h4>
        <AllOfHealthTable
          labels={["Categories", "Details"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {otherInformation.map((info, index) => (
            <tr className="h-16 text-blue4 font-medium" key={index}>
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {info.categories}
              </td>
              <td className=" text-xs lg:text-base">{info.details}</td>
            </tr>
          ))}
        </AllOfHealthTable>
      </div>
      <div>
        <h4 className="text-base lg:text-2xl mb-4 font-semibold">
          ADD TO PATIENT RECORD
        </h4>
        <Field label="DIAGNOSIS">
          <textarea className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px]" />
        </Field>
        <Field label="MEDICATION">
          <textarea className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px]" />
        </Field>
        <Field label="PRODUCTS TO BE ADMINISTERED">
          <textarea className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px]" />
        </Field>
        <Button
          variant="secondary"
          className="mx-auto"
          onClick={() => handleToggleSuccessfullyEditedMedicalRecord()}
        >
          {" "}
          Save details
        </Button>
      </div>
      <div ref={successfullyEditedMedicalRecordModalRef}>
        <SuccessfullyEditedMedicalRecordModal
          container={successfullyEditedMedicalRecordModalContainer!}
          title="Successful!"
        />
      </div>
    </div>
  );
};

export default ViewPatientMedicalRecord;
