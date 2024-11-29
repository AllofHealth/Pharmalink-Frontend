import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { useGetSharedPrescriptions } from "@/lib/queries/pharmacist";
import {
  setCurrentPrescription,
  setPharmacistCurrentTab,
} from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import type { Prescription } from "@/lib/types";
import { formatDateToSlashDate } from "@/utils/formatDateToSlashDate";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

const PharmacistPrescriptionList = () => {
  const { address } = useAccount();

  const { loading, sharedPrescriptions, error } = useGetSharedPrescriptions({
    walletAddress: address ? address : "",
  });

  const dispatch = useDispatch();

  const handleViewPrescription = (prescription: Prescription) => {
    dispatch(setPharmacistCurrentTab("View Prescription"));
    dispatch(setCurrentPrescription(prescription));
  };
  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-6">Prescription List</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : sharedPrescriptions ? (
        <AllOfHealthTable
          labels={["Date", "Patient", "Doctor", "Institution"]}
          caption="Approve Institution Table"
          headClassName="bg-gray-5 rounded-t-md"
        >
          {sharedPrescriptions?.prescriptions?.map((prescription, index) => (
            <tr
              className="h-16 text-blue4 font-medium"
              key={index}
              onClick={() => handleViewPrescription(prescription)}
            >
              <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                {formatDateToSlashDate(prescription.date)}
              </td>
              <td className=" text-xs lg:text-base">
                {prescription.patientName}
              </td>

              <td className=" text-xs lg:text-base">
                {prescription.doctorName}
              </td>
              <td className=" text-xs lg:text-base">
                {prescription.institutionName}
              </td>
            </tr>
          ))}
        </AllOfHealthTable>
      ) : error ? (
        <p>Error fetching shared prescriptions...</p>
      ) : null}
    </div>
  );
};

export default PharmacistPrescriptionList;
