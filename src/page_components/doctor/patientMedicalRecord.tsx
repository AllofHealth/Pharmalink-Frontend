import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import Button from "@/components/button/Button";
import { useGetPatientByAddress } from "@/lib/queries/auth";
import {
  useGetAllPatientMedicalRecords,
  useGetPatientFamilyMemberDetail,
} from "@/lib/queries/patient";
import type { RootState } from "@/lib/redux/rootReducer";
import { setDoctorCurrentTab } from "@/lib/redux/slices/doctor/doctorSlice";
import type { GetPatientMessage } from "@/lib/types";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";

const PatientMedicalRecord = () => {
  // const { address, isConnected } = useAccount();
  const patientRecordData = useSelector(
    (state: RootState) => state.doctor.currentPatientRecord
  );
  console.log(patientRecordData);

  const {
    loading: loadingPatientData,
    patientData,
    error: errorPatientData,
  } = useGetPatientByAddress({
    address: patientRecordData?.recordOwner ?? "",
  });
  console.log(patientData);

  const dispatch = useDispatch();

  const { loading, medicalRecords, familyMemberMedicalRecords, error } =
    useGetAllPatientMedicalRecords({
      walletAddress: patientRecordData?.recordOwner ?? "",
      familyMemberId: Number(patientRecordData?.patientId) ?? "",
    });

  const {
    loading: loadingFamilyMemberDetail,
    familyMember,
    error: errorFamilyMember,
  } = useGetPatientFamilyMemberDetail({
    walletAddress: patientRecordData?.recordOwner ?? "",
    familyMemberId: Number(patientRecordData?.patientId) ?? "",
  });

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Patient Medical Record</h1>
      {loadingPatientData ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : patientData && patientRecordData?.recordTag === "patient" ? (
        <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
          <Image
            src={(patientData as GetPatientMessage)?.patient?.profilePicture}
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
            <Button
              variant="primary"
              onClick={() =>
                dispatch(setDoctorCurrentTab("EditPatientMedicalRecord"))
              }
            >
              Add to Record
            </Button>
          </div>
        </article>
      ) : familyMember && patientRecordData?.recordTag === "familyMember" ? (
        <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
          <Image
            src={(patientData as GetPatientMessage)?.patient?.profilePicture}
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
              <span className="font-normal">{familyMember.member.email}</span>
            </div>
            {/* <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">{(patientData as GetPatientMessage)?.patient?.} </span>
            </div> */}
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Address: </span>
              <span className="font-normal">{familyMember.member.address}</span>
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
            <Button
              variant="primary"
              onClick={() =>
                dispatch(setDoctorCurrentTab("patientMedicalRecordDetails"))
              }
            >
              Add to Record
            </Button>
          </div>
        </article>
      ) : errorPatientData ? (
        <p>Error fetching data...</p>
      ) : null}

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : medicalRecords && patientRecordData?.recordTag === "patient" ? (
        <AllOfHealthTable
          labels={["Date", "Diagnosis", "Doctor", "Institution"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {medicalRecords?.medicalRecords?.map((record) => (
            <tr
              className="h-16 text-blue4 font-medium"
              key={record._id}
              onClick={() =>
                dispatch(setDoctorCurrentTab("patientMedicalRecordDetails"))
              }
            >
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {formatDate(record.date)}
              </td>
              <td className=" text-xs lg:text-base">{record.diagnosis}</td>
              <td className=" text-xs lg:text-base">{record.doctorsName}</td>
              <td className=" text-xs lg:text-base">{record.hospitalName}</td>
              {/* <td className=" text-xs lg:text-base">{record.action}</td> */}
            </tr>
          ))}
        </AllOfHealthTable>
      ) : familyMemberMedicalRecords &&
        patientRecordData?.recordTag === "familyMember" ? (
        <AllOfHealthTable
          labels={["Date", "Diagnosis", "Doctor", "Institution"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {familyMemberMedicalRecords?.records.map((record) => (
            <tr
              className="h-16 text-blue4 font-medium"
              key={record._id}
              onClick={() =>
                dispatch(setDoctorCurrentTab("patientMedicalRecordDetails"))
              }
            >
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {formatDate(record.date)}
              </td>
              <td className=" text-xs lg:text-base">{record.diagnosis}</td>
              <td className=" text-xs lg:text-base">{record.doctorsName}</td>
              <td className=" text-xs lg:text-base">{record.hospitalName}</td>
              {/* <td className=" text-xs lg:text-base">{record.action}</td> */}
            </tr>
          ))}
        </AllOfHealthTable>
      ) : error ? (
        <p>Error fetching data...</p>
      ) : null}
    </div>
  );
};

export default PatientMedicalRecord;
