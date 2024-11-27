import { viewMedicalRecord } from "@/actions/contract/patient/patient.service.c";
import { retrieveRecordFromIpfs } from "@/actions/shared/utils/upload.to.ipfs";
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
import type {
  GetPatientMessage,
  PatientMedicalRecordFromChain,
} from "@/lib/types";
import { formatDate } from "@/utils/formatDate";
import { current } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const ViewPatientMedicalRecord = () => {
  const { address } = useAccount();
  const {
    loading: loadingPatientData,
    patientData,
    error: errorPatientData,
  } = useGetPatientByAddress({
    address: address ? address : "",
  });

  const currentPatientRecord = useSelector(
    (state: RootState) => state.patient.currentRecord
  );

  const [ipfsHash, setIpfsHash] = useState("");

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

  const getIpfsHash = async () => {
    if (address && patientData) {
      const ipfsHash = await viewMedicalRecord({
        patientId: (patientData as GetPatientMessage)?.patient?.id,
        viewerAddress: address ?? "",
        recordId: currentPatientRecord,
      });

      setIpfsHash(ipfsHash.ipfs_hash);
    }
  };

  const [patientMedicalRecord, setPatientMedicalRecord] =
    useState<PatientMedicalRecordFromChain | null>(null);

  const medicalRecordAccess = async () => {
    if (ipfsHash) {
      try {
        const patientMedicalRecord = await retrieveRecordFromIpfs(ipfsHash);
        console.log(patientMedicalRecord);
        setPatientMedicalRecord(patientMedicalRecord);
      } catch (error) {
        toast.error("Cannot fetch patient medical record");
      }
    }
  };

  useEffect(() => {
    if (address && !ipfsHash) {
      getIpfsHash();
    }
  }, [patientData]);

  useEffect(() => {
    if (ipfsHash) {
      medicalRecordAccess();
    }
  }, [ipfsHash]);

  if (loadingPatientData || patientMedicalRecord === null)
    return <BiLoaderAlt className="text-xl text-center mx-auto" />;

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Patient Medical Record</h1>
      <>
        <div className="flex flex-col gap-8 lg:flex-row">
          <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
            <Image
              src={""}
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
                <span className="font-normal">Patient</span>
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
                  {(patientData as GetPatientMessage)?.patient?.bloodGroup}
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

          <article className="flex flex-col gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 flex-1 h-max max-w-[430px]">
            <h3 className="text-xl lg:text-2xl mb-4 font-semibold">
              General Report
            </h3>
            <div className="flex flex-row gap-2 items-center mb-4">
              <span className="font-bold">Heartbeat: </span>
              <span className="font-normal">
                {patientMedicalRecord?.generalReport.heartBeat}{" "}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center mb-4">
              <span className="font-bold">Blood Pressure: </span>
              <span className="font-normal">
                {patientMedicalRecord?.generalReport.bloodPressure}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center mb-4">
              <span className="font-bold">Sugar Level: </span>
              <span className="font-normal">
                {patientMedicalRecord?.generalReport.sugarLevel}
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center mb-4">
              <span className="font-bold">Haemoglobin: </span>
              <span className="font-normal">
                {patientMedicalRecord?.generalReport.haemoglobin}{" "}
              </span>
            </div>
          </article>
        </div>

        <div className="flex flex-wrap gap-4">
          <span
            key={1}
            className="text-base lg:text-2xl px-6 py-4 rounded-2xl h-14 lg:h-20 bg-gradient-to-b from-teal-55 to-gray-55 block w-max mb-8"
          >
            DIAGNOSIS: {patientMedicalRecord?.diagnosis}
          </span>
        </div>

        <div>
          <h4 className="text-base lg:text-2xl mb-4">LAB RESULT</h4>
          <AllOfHealthTable
            labels={[
              "Test Name",
              "Test Date",
              "Reference Range",
              "Units",
              "Comments",
            ]}
            caption="Approve Institution Table"
            headClassName="bg-gray-5 rounded-t-md"
          >
            <tr className="h-16 text-blue4 font-medium">
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {patientMedicalRecord?.labResults.testName}
              </td>
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {formatDate(patientMedicalRecord?.date ?? "")}
              </td>
              <td className=" text-xs lg:text-base">
                {patientMedicalRecord?.labResults.referenceRange}
              </td>
              <td className=" text-xs lg:text-base">
                {patientMedicalRecord?.labResults.units}
              </td>
              <td className=" text-xs lg:text-base">
                {patientMedicalRecord?.labResults.comments}
              </td>
            </tr>
          </AllOfHealthTable>
        </div>

        <div className="my-8">
          <h4 className="text-base lg:text-2xl mb-4">IMAGES</h4>
          <div className="flex items-center gap-4">
            {patientMedicalRecord?.recordImages ? (
              <p className="font-bold uppercase text-2xl">No images</p>
            ) : (
              patientMedicalRecord?.recordImages.map((image) => {
                return (
                  <div className="flex flex-col gap-4" key={image}>
                    <Image
                      src="/assets/images/lab_result_img.jpg"
                      alt="Lab Image"
                      width={376}
                      height={414}
                      className="rounded-[10px]"
                    />
                    <p className="text-xs lg:text-base">Test image</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
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
      </>
      {/* <div className="flex flex-col sm:flex-row justify-between items-center mt-12">
        <div className="grid gap-2">
          <Image
            src={"/assets/images/no-records.png"}
            alt=""
            width={410}
            height={369}
            className="sm:hidden"
          />
          <p className="text-2xl lg:text-5xl">No Records Found!</p>
          <p className="text-6B6B6B sm:text-2xl">
            You have no medical record!.
          </p>
        </div>
        <Image
          src={"/assets/images/no-records.png"}
          alt=""
          width={410}
          height={369}
          className="hidden sm:block"
        />
      </div> */}

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
