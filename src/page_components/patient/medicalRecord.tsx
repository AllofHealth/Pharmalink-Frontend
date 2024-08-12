import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { useGetAllPatientPresciptions } from "@/lib/queries/patient";
import {
  setCurrentPrescription,
  setPatientCurrentTab,
} from "@/lib/redux/slices/patient/patientSlice";
import type { Prescription } from "@/lib/types";
import { formatDate } from "@/utils/formatDate";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

const MedicalRecord = () => {
  const { address } = useAccount();
  //   const { loading, patientPrescriptions, error } = useGetAllPatientPresciptions(
  //     { walletAddress: address ? address : "" }
  //   );
  const medicalRecord = [
    {
      id: 1,
      date: "29/09/2003",
      diagnosis: "Cholera",
      doctor: "Adebayo Salami",
      institution: "Hamas Hospital",
    },
  ];

  const dispatch = useDispatch();

  const handleViewPatientMedicalRecord = () => {
    dispatch(setPatientCurrentTab("ViewPatientMedicalRecord"));
  };

  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-6">Medical Record</h1>
      {
        //   loading ? (
        //     <BiLoaderAlt className="text-xl text-center mx-auto" />
        //   ) : patientPrescriptions ? (
        <AllOfHealthTable
          labels={["Date", "Diagnosis", "Doctor", "Institution"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {medicalRecord.map((record) => {
            return (
              <tr
                className="h-16 text-blue4 font-medium"
                key={record.id}
                onClick={() => handleViewPatientMedicalRecord()}
              >
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {record.date}
                </td>

                <td className=" text-xs lg:text-base">{record.diagnosis}</td>
                <td className=" text-xs lg:text-base">{record.doctor}</td>
                <td className=" text-xs lg:text-base">{record.institution}</td>
              </tr>
            );
          })}
        </AllOfHealthTable>
        //   ) : error ? (
        //     <p>Error fetching data...</p>
        //   ) : null
      }
    </div>
  );
};

export default MedicalRecord;
