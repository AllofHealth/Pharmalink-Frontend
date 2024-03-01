import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import { useDispatch } from "react-redux";

const PharmacistPrescriptionList = () => {
  const prescriptionLists = [
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
    {
      date: "02/29/2009",
      patient: "Adewale Daniel",
      doctor: "Dr Adewale Daniel",
      institution: "Hadas Health Centre",
    },
  ];

  const dispatch = useDispatch();
  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-6">Prescription List</h1>
      <AllOfHealthTable
        labels={["Date", "Patient", "Doctor", "Institution"]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {prescriptionLists.map((prescription, index) => (
          <tr
            className="h-16 text-blue4 font-medium"
            key={index}
            onClick={() =>
              dispatch(setPharmacistCurrentTab("View Prescription"))
            }
          >
            <td className="pl-2 lg:pl-7 text-xs lg:text-base">
              {prescription.date}
            </td>
            <td className=" text-xs lg:text-base">{prescription.patient}</td>

            <td className=" text-xs lg:text-base">{prescription.doctor}</td>
            <td className=" text-xs lg:text-base">
              {prescription.institution}
            </td>
          </tr>
        ))}
      </AllOfHealthTable>
    </div>
  );
};

export default PharmacistPrescriptionList;
