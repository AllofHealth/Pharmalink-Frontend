import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { setDoctorCurrentTab } from "@/lib/redux/slices/doctor/doctorSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

const PatientMedicalRecord = () => {
  const records = [
    {
      date: "12/09/2021",
      diagnosis: "Malaria",
      doctor: "Dr. John Doe",
      institution: "YongiDuu Hospital",
      action: "View",
    },
    {
      date: "12/09/2021",
      diagnosis: "Malaria",
      doctor: "Dr. John Doe",
      institution: "YongiDuu Hospital",
      action: "View",
    },
    {
      date: "12/09/2021",
      diagnosis: "Malaria",
      doctor: "Dr. John Doe",
      institution: "YongiDuu Hospital",
      action: "View",
    },
    {
      date: "12/09/2021",
      diagnosis: "Malaria",
      doctor: "Dr. John Doe",
      institution: "YongiDuu Hospital",
      action: "View",
    },
    {
      date: "12/09/2021",
      diagnosis: "Malaria",
      doctor: "Dr. John Doe",
      institution: "YongiDuu Hospital",
      action: "View",
    },
  ];

  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Patient Medical Record</h1>
      <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
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
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Role: </span>
            <span className="font-normal">Patient</span>
          </div>
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Email: </span>
            <span className="font-normal">jayvaughn@gmail.com</span>
          </div>
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Phone Number: </span>
            <span className="font-normal">+23478219876 </span>
          </div>
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Address: </span>
            <span className="font-normal">100, cross street, Calabar.</span>
          </div>
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Age: </span>
            <span className="font-normal">35</span>
          </div>
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Date of birth: </span>
            <span className="font-normal">12/09/1800</span>
          </div>
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Blood Group:</span>
            <span className="font-normal">O+ </span>
          </div>
          <div className="flex gap-2 itmes-center mb-2">
            <span className="font-bold">Genotype: </span>
            <span className="font-normal">AA </span>
          </div>
        </div>
      </article>
      <AllOfHealthTable
        labels={["Date", "Diagnosis", "Doctor", "Institution", "Action"]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {records.map((record, index) => (
          <tr
            className="h-16 text-blue4 font-medium"
            key={index}
            onClick={() =>
              dispatch(setDoctorCurrentTab("patientMedicalRecordDetails"))
            }
          >
            <td className="pl-2 lg:pl-7 text-xs lg:text-base">{record.date}</td>
            <td className=" text-xs lg:text-base">{record.diagnosis}</td>
            <td className=" text-xs lg:text-base">{record.doctor}</td>
            <td className=" text-xs lg:text-base">{record.institution}</td>
            <td className=" text-xs lg:text-base">{record.action}</td>
          </tr>
        ))}
      </AllOfHealthTable>
    </div>
  );
};

export default PatientMedicalRecord;
