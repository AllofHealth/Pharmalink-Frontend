import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import {
  useGetAllPatientMedicalRecords,
  useGetAllPatientPresciptions,
} from "@/lib/queries/patient";
import {
  setCurrentPrescription,
  setCurrentRecord,
  setPatientCurrentTab,
} from "@/lib/redux/slices/patient/patientSlice";
import type { Prescription } from "@/lib/types";
import { formatDate } from "@/utils/formatDate";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

const MedicalRecord = () => {
  const { address } = useAccount();

  const { loading, medicalRecords, error } = useGetAllPatientMedicalRecords({
    walletAddress: address ? address : "",
    familyMemberId: 0,
  });

  const dispatch = useDispatch();

  const handleViewPatientMedicalRecord = (recordId: number) => {
    dispatch(setPatientCurrentTab("ViewPatientMedicalRecord"));
    dispatch(setCurrentRecord(recordId));
  };

  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-6">Medical Record</h1>
      {loading ? (
        <BiLoaderAlt className="text-xl text-center mx-auto" />
      ) : medicalRecords?.medicalRecords.length !== 0 ? (
        <AllOfHealthTable
          labels={["Date", "Diagnosis", "Doctor", "Institution"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {medicalRecords?.medicalRecords.map((record) => {
            return (
              <tr
                className="h-16 text-blue4 font-medium"
                key={record.id}
                onClick={() => handleViewPatientMedicalRecord(record.id)}
              >
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {formatDate(record.date)}
                </td>

                <td className=" text-xs lg:text-base">{record.diagnosis}</td>
                <td className=" text-xs lg:text-base">{record.doctorsName}</td>
                <td className=" text-xs lg:text-base">{record.hospitalName}</td>
              </tr>
            );
          })}
        </AllOfHealthTable>
      ) : medicalRecords.medicalRecords.length === 0 ? (
        <div>
          <p className="text-2xl font-bold text-center">No Records found</p>
        </div>
      ) : error ? (
        <p>Error fetching data...</p>
      ) : null}
    </div>
  );
};

export default MedicalRecord;
