import { viewMedicalRecord } from "@/actions/contract/patient/patient.service.c";
import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import SuccessfullyEditedMedicalRecordModal from "@/components/modal/doctor/SuccessFullyEditedMedicalRecordModal";
import useAxios from "@/lib/hooks/useAxios";
import { createMedicalRecord } from "@/lib/mutations/doctor";
import { useGetPatientByAddress } from "@/lib/queries/auth";
import {
  useGetAllPatientMedicalRecords,
  useGetPatientFamilyMemberDetail,
} from "@/lib/queries/patient";
import { RootState } from "@/lib/redux/rootReducer";
import { toggleSuccessfullyEditedMedicalRecordModal } from "@/lib/redux/slices/modals/modalSlice";
import type { GetPatientMessage } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const ViewPatientMedicalRecord = () => {
  // const labResult = [
  //   {
  //     testName: "Complete blood count",
  //     date: "2024-01-09",
  //     referenceRange: "4,000 - 11,000 cells/μL90%",
  //     units: "cells/μL",
  //     comments: "Within normal range",
  //   },
  //   {
  //     testName: "Complete blood count",
  //     date: "2024-01-09",
  //     referenceRange: "4,000 - 11,000 cells/μL90%",
  //     units: "cells/μL",
  //     comments: "Within normal range",
  //   },
  // ];

  // const otherInformation = [
  //   {
  //     categories: "SOCIAL HISTORY",
  //     details: "Non-, occasional alcohol-use",
  //   },
  //   {
  //     categories: "KNOWN ALLERGIES",
  //     details: "Lactose intolerant, ginger",
  //   },
  //   {
  //     categories: "OCCUPATIONAL HISTORY",
  //     details: "Office worker with no known occupational hazards",
  //   },
  //   {
  //     categories: "PERSON/FAMILY STRESSORS",
  //     details: "None",
  //   },
  // ];

  const { axios } = useAxios({});
  const { address } = useAccount();
  const [ipfsHash, setIpfsHash] = useState("");
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

  useEffect(() => {
    if (successfullyEditedMedicalRecordModalRef.current) {
      setSuccessfullyEditedMedicalRecordModalContainer(
        successfullyEditedMedicalRecordModalRef.current
      );
    }
  }, [isSuccessfullyEditedMedicalRecordModalOpen]);

  const patientRecordData = useSelector(
    (state: RootState) => state.doctor.currentPatientRecord
  );

  const {
    loading: loadingPatientData,
    patientData,
    error: errorPatientData,
  } = useGetPatientByAddress({
    address: patientRecordData?.recordOwner ?? "",
  });

  const {
    loading: loadingFamilyMemberDetail,
    familyMember,
    error: errorFamilyMember,
  } = useGetPatientFamilyMemberDetail({
    walletAddress: patientRecordData?.recordOwner ?? "",
    familyMemberId: Number(patientRecordData?.patientId) ?? "",
  });

  const { loading, medicalRecords, familyMemberMedicalRecords, error } =
    useGetAllPatientMedicalRecords({
      walletAddress: patientRecordData?.recordOwner ?? "",
      familyMemberId: Number(patientRecordData?.patientId) ?? "",
    });

  const [medicalRecord, setMedicalRecord] = useState({
    diagnosis: "",
    medication: "",
    products: "",
  });

  const handleInputFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMedicalRecord({
      ...medicalRecord,
      [e.target.name]: e.target.value,
    });
  };
  console.log(medicalRecord);

  const isFormFilled = medicalRecord.diagnosis;

  const getIpfsHash = async () => {
    if (patientRecordData && address) {
      const ipfsHash = await viewMedicalRecord({
        patientId: patientRecordData!.patientId,
        viewerAddress: address ?? "",
        recordId: patientRecordData?.recordId ?? 0,
      });

      setIpfsHash(ipfsHash.recordDetailsUri);
    }
  };

  const medicalRecordAccess = async () => {
    try {
    } catch (error) {}
  };

  console.log(ipfsHash);

  useEffect(() => {
    if (patientRecordData && address) {
      getIpfsHash();
    }
  }, []);

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Patient Medical Record</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <>
          {loadingPatientData ? (
            <div className="flex justify-center items-center mt-10">
              <BiLoaderAlt className="text-2xl text center animate-spin" />
            </div>
          ) : patientData && patientRecordData?.recordTag === "patient" ? (
            <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
              <Image
                src={
                  (patientData as GetPatientMessage)?.patient?.profilePicture
                }
                alt="Face card"
                width={94}
                height={94}
                className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
              />
              <div>
                <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
                  {(patientData as GetPatientMessage)?.patient?.name}
                </h3>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Role: </span>
                  <span className="font-normal">
                    {(patientData as GetPatientMessage)?.patient?.category}
                  </span>
                </div>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Email: </span>
                  <span className="font-normal">
                    {(patientData as GetPatientMessage)?.patient?.email}
                  </span>
                </div>
                {/* <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">{(patientData as GetPatientMessage)?.patient?.} </span>
            </div> */}
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Address: </span>
                  <span className="font-normal">
                    {(patientData as GetPatientMessage)?.patient?.address}
                  </span>
                </div>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Age: </span>
                  <span className="font-normal">
                    {(patientData as GetPatientMessage)?.patient?.age}
                  </span>
                </div>
                {/* <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Date of birth: </span>
              <span className="font-normal">12/09/1800</span>
            </div> */}
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Blood Group:</span>
                  <span className="font-normal">
                    {(patientData as GetPatientMessage)?.patient?.bloodGroup}{" "}
                  </span>
                </div>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Genotype: </span>
                  <span className="font-normal">
                    {(patientData as GetPatientMessage)?.patient?.genotype}
                  </span>
                </div>
              </div>
            </article>
          ) : familyMember &&
            patientRecordData?.recordTag === "familyMember" ? (
            <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
              <Image
                src={
                  (patientData as GetPatientMessage)?.patient?.profilePicture
                }
                alt="Face card"
                width={94}
                height={94}
                className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
              />
              <div>
                <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
                  {familyMember.member.name}
                </h3>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Role: </span>
                  <span className="font-normal">
                    Patient&apos;s {familyMember.member.relationship}
                  </span>
                </div>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Email: </span>
                  <span className="font-normal">
                    {familyMember.member.email}
                  </span>
                </div>
                {/* <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">{(patientData as GetPatientMessage)?.patient?.} </span>
            </div> */}
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Address: </span>
                  <span className="font-normal">
                    {familyMember.member.address}
                  </span>
                </div>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Age: </span>
                  <span className="font-normal">{familyMember.member.age}</span>
                </div>
                {/* <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Date of birth: </span>
              <span className="font-normal">12/09/1800</span>
            </div> */}
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Blood Group:</span>
                  <span className="font-normal">
                    {familyMember.member.bloodGroup}{" "}
                  </span>
                </div>
                <div className="flex gap-2 itmes-center mb-2">
                  <span className="font-bold">Genotype: </span>
                  <span className="font-normal">
                    {familyMember.member.genotype}
                  </span>
                </div>
              </div>
            </article>
          ) : errorPatientData ? (
            <p>Error fetching data...</p>
          ) : null}
        </>
        {/* <article className="flex flex-col gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 flex-1 h-max max-w-[430px]">
          <h3 className="text-xl lg:text-2xl mb-4 font-semibold">
            General Report
          </h3>
          <div className="flex flex-col gap-2 items-center mb-4">
            <span className="font-bold">Blood Group: </span>
            <span className="font-normal">89% </span>
          </div>
          <div className="flex flex-col gap-2 items-center mb-4">
            <span className="font-bold">Genotype: </span>
            <span className="font-normal">90% </span>
          </div>
        </article> */}
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : medicalRecords && patientRecordData?.recordTag === "patient" ? (
        <div className="flex flex-wrap gap-4">
          {medicalRecords?.medicalRecords.map((record) => {
            return (
              <span
                key={record._id}
                className="text-base lg:text-2xl px-6 py-4 rounded-2xl h-14 lg:h-20 bg-gradient-to-b from-teal-55 to-gray-55 block w-max mb-8"
              >
                DIAGNOSIS: {record.diagnosis}
              </span>
            );
          })}
        </div>
      ) : familyMemberMedicalRecords &&
        patientRecordData?.recordTag === "familyMember" ? (
        <div className="flex flex-wrap gap-4">
          {familyMemberMedicalRecords?.records.map((record) => {
            return (
              <span
                key={record._id}
                className="text-base lg:text-2xl px-6 py-4 rounded-2xl h-14 lg:h-20 bg-gradient-to-b from-teal-55 to-gray-55 block w-max mb-8"
              >
                DIAGNOSIS: {record.diagnosis}
              </span>
            );
          })}
        </div>
      ) : error ? (
        <p>Error fetching data...</p>
      ) : null}

      {/* <div>
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
      </div> */}

      {/* <div className="my-8">
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
      </div> */}
      {/* <div>
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
      </div> */}
      <div>
        <h4 className="text-base lg:text-2xl mb-4 font-semibold">
          ADD TO PATIENT RECORD
        </h4>
        <Field label="DIAGNOSIS">
          <textarea
            name="diagnosis"
            className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px] p-4"
            value={medicalRecord.diagnosis}
            onChange={handleInputFormChange}
          />
        </Field>
        {/* <Field label="MEDICATION">
          <textarea
            name="medication"
            className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px]"
            value={medicalRecord.medication}
            onChange={handleInputFormChange}
          />
        </Field>
        <Field label="PRODUCTS TO BE ADMINISTERED">
          <textarea
            name="products"
            className="bg-blue7 h-24 resize-none rounded-md mb-4 max-w-[705px]"
            value={medicalRecord.products}
            onChange={handleInputFormChange}
          />
        </Field> */}
        <Button
          variant="secondary"
          className="mx-auto"
          onClick={() =>
            createMedicalRecord({
              axios,
              dispatch,
              patientAddress: patientRecordData?.recordOwner ?? "",
              doctorAddress: address ?? "",
              recordId: patientRecordData?.recordId ?? 0,
              medicalRecordValues: medicalRecord,
            })
          }
          disabled={!isFormFilled}
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
