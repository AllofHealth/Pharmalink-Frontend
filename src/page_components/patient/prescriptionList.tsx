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

const PrescriptionList = () => {
  const { address } = useAccount();
  const { loading, patientPrescriptions, error } = useGetAllPatientPresciptions(
    { walletAddress: address ? address : "" }
  );

  const dispatch = useDispatch();

  const handleViewPrescription = (prescription: Prescription) => {
    dispatch(setPatientCurrentTab("View Prescription"));
    dispatch(setCurrentPrescription(prescription));
  };

  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-6">Prescription List</h1>
      {loading ? (
        <BiLoaderAlt className="text-xl text-center mx-auto" />
      ) : patientPrescriptions ? (
        <AllOfHealthTable
          labels={["Date", "Doctor", "Medicine"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {patientPrescriptions.prescriptions.map((prescription) => {
            return (
              <tr
                className="h-16 text-blue4 font-medium"
                key={prescription._id}
                onClick={() => handleViewPrescription(prescription)}
              >
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {formatDate(prescription.date)}
                </td>
                <td className=" text-xs lg:text-base">
                  {prescription.doctorName}
                </td>
                <td className=" text-xs lg:text-base">
                  {prescription.medicineGroup}
                </td>
              </tr>
            );
          })}
        </AllOfHealthTable>
      ) : error ? (
        <p>Error fetching data...</p>
      ) : null}
    </div>
  );
};

export default PrescriptionList;
