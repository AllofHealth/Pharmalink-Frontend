import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { useGetAllDoctors } from "@/lib/queries/doctor";
import { useGetInstitutions } from "@/lib/queries/institutions";
import { useGetAllPatients } from "@/lib/queries/patient";
import { useGetAllPharmacists } from "@/lib/queries/pharmacist";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Practitioners = () => {
  const [activeTab, setActiveTab] = useState("Institutions");

  const { institutions, loading, error } = useGetInstitutions();
  const {
    doctors,
    loading: allDoctorsLoading,
    error: allDoctorsError,
  } = useGetAllDoctors();
  const {
    pharmacists,
    loading: allPharmacistsLoading,
    error: allPharmacistsError,
  } = useGetAllPharmacists();
  const {
    patients,
    loading: allPatientsLoading,
    error: allPatientsError,
  } = useGetAllPatients();

  const labels =
    activeTab === "Institutions"
      ? ["Name", "Reg No", "Wallet Address", "Phone No."]
      : activeTab === "Doctors"
      ? ["Name", "Specialty", "Mobile Number", "Wallet Address"]
      : activeTab === "Patients"
      ? ["Name", "Email", "Wallet Address", "Age"]
      : activeTab === "Pharmacists"
      ? ["Name", "Wallet Address", "Mobile No.", "Email"]
      : [];

  const trimText = (text: string, maxLength: number = 10): string => {
    return text?.toString().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-6">Practitioners</h1>
      <div className="mb-4 flex gap-6">
        <span
          className={`border border-[#B0B0B0] rounded-lg px-2 py-2 text-center w-[100px] h-10 block ${
            activeTab === "Institutions" ? "bg-[#12778C] text-white" : ""
          }`}
          onClick={() => setActiveTab("Institutions")}
        >
          Institutions
        </span>
        <span
          className={`border border-[#B0B0B0] rounded-lg px-2 py-2 text-center w-[100px] h-10 block ${
            activeTab === "Doctors" ? "bg-[#12778C] text-white" : ""
          }`}
          onClick={() => setActiveTab("Doctors")}
        >
          Doctors
        </span>
        <span
          className={`border border-[#B0B0B0] rounded-lg px-2 py-2 text-center w-[120px] h-10 block ${
            activeTab === "Pharmacists" ? "bg-[#12778C] text-white" : ""
          }`}
          onClick={() => setActiveTab("Pharmacists")}
        >
          Pharmacists
        </span>
        <span
          className={`border border-[#B0B0B0] rounded-lg px-2 py-2 text-center w-[100px] h-10 block ${
            activeTab === "Patients" ? "bg-[#12778C] text-white" : ""
          }`}
          onClick={() => setActiveTab("Patients")}
        >
          Patients
        </span>
      </div>
      <AllOfHealthTable
        labels={labels}
        caption="Practitioner's Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {loading ||
        allDoctorsLoading ||
        allPatientsLoading ||
        allPatientsLoading ? (
          <BiLoaderAlt className="text-xl text-center animate-spin h-20" />
        ) : activeTab === "Institutions" && institutions ? (
          <>
            {institutions?.hospitals.map((institution, index) => (
              <tr className="h-16 text-blue4 font-medium" key={institution.id}>
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {institution.name}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(institution.regNo)}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(institution.admin)}
                </td>
                <td className=" text-xs lg:text-base">{institution.phoneNo}</td>
              </tr>
            ))}
          </>
        ) : activeTab === "Doctors" && doctors ? (
          <>
            {doctors?.allDoctors.map((doctor, index) => (
              <tr className="h-16 text-blue4 font-medium" key={doctor.id}>
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {doctor.name}
                </td>
                <td className=" text-xs lg:text-base">{doctor.specialty}</td>
                <td className=" text-xs lg:text-base">{doctor.phoneNumber}</td>
                <td className=" text-xs lg:text-base">
                  {trimText(doctor.walletAddress)}
                </td>
              </tr>
            ))}
          </>
        ) : activeTab === "Patients" && patients ? (
          <>
            {patients.map((patient, index) => (
              <tr className="h-16 text-blue4 font-medium" key={patient.id}>
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {patient.name}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(patient.email)}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(patient.address)}
                </td>
                <td className=" text-xs lg:text-base">{patient.age}</td>
              </tr>
            ))}
          </>
        ) : activeTab === "Pharmacists" && pharmacists ? (
          <>
            {pharmacists.pharmacists.map((pharmacist, index) => (
              <tr className="h-16 text-blue4 font-medium" key={pharmacist.id}>
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {pharmacist.name}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(pharmacist.walletAddress)}
                </td>
                <td className=" text-xs lg:text-base">
                  {pharmacist.phoneNumber}
                </td>
                <td className=" text-xs lg:text-base">{pharmacist.email}</td>
              </tr>
            ))}
          </>
        ) : (
          <p>Error fetching data....</p>
        )}
      </AllOfHealthTable>
    </div>
  );
};

export default Practitioners;
