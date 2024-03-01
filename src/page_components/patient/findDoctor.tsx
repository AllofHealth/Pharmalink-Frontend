import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

const FindDoctorByPatient = () => {
  const doctorList = [
    {
      doctorName: "Dr. Nicci Troiani",
      doctorIdNo: "98745120JIKUYA",
      doctorSpeciality: "Medical Doctor",
      institution: "Hadas Institution",
      status: "ONLINE",
    },
    {
      doctorName: "Dr. Nicci Troiani",
      doctorIdNo: "98745120JIKUYA",
      doctorSpeciality: "Medical Doctor",
      institution: "Hadas Institution",
      status: "ONLINE",
    },
    {
      doctorName: "Dr. Nicci Troiani",
      doctorIdNo: "98745120JIKUYA",
      doctorSpeciality: "Medical Doctor",
      institution: "Hadas Institution",
      status: "ONLINE",
    },
    {
      doctorName: "Dr. Nicci Troiani",
      doctorIdNo: "98745120JIKUYA",
      doctorSpeciality: "Medical Doctor",
      institution: "Hadas Institution",
      status: "ONLINE",
    },
    {
      doctorName: "Dr. Nicci Troiani",
      doctorIdNo: "98745120JIKUYA",
      doctorSpeciality: "Medical Doctor",
      institution: "Hadas Institution",
      status: "ONLINE",
    },
    {
      doctorName: "Dr. Nicci Troiani",
      doctorIdNo: "98745120JIKUYA",
      doctorSpeciality: "Medical Doctor",
      institution: "Hadas Institution",
      status: "ONLINE",
    },
    {
      doctorName: "Dr. Nicci Troiani",
      doctorIdNo: "98745120JIKUYA",
      doctorSpeciality: "Medical Doctor",
      institution: "Hadas Institution",
      status: "ONLINE",
    },
  ];

  const dispatch = useDispatch();
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold lg:text-3xl lg:mb-6">Find Doctor</h1>
        <Field id="approval" label="">
          <Input
            id="approval"
            type="search"
            name="approval"
            placeholder="Search"
            className="h-10 w-20 lg:w-auto"
          />
        </Field>
      </div>

      <AllOfHealthTable
        labels={[
          "Doctor's Name",
          "Doc. ID",
          "Specialty",
          "institution",
          "status",
        ]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {doctorList.map((doctorList, index) => (
          <tr className="h-16 text-blue4 font-medium" key={index}>
            <td
              className="pl-2 lg:pl-7 text-xs lg:text-base flex gap-2 items-center mt-4"
              onClick={() => dispatch(setPatientCurrentTab("Doctor Profile"))}
            >
              <h3>
                <Image
                  src="/assets/images/avatar.png"
                  alt="Memoji"
                  width={32}
                  height={32}
                  className="lg:w-16 lg:h-16"
                />
              </h3>
              {doctorList.doctorName}
            </td>
            <td className=" text-xs lg:text-base">{doctorList.doctorIdNo}</td>
            <td className=" text-xs lg:text-base">
              {doctorList.doctorSpeciality}
            </td>
            <td className=" text-xs lg:text-base">{doctorList.institution}</td>
            <td className=" text-xs lg:text-base">{doctorList.status}</td>
          </tr>
        ))}
      </AllOfHealthTable>
    </div>
  );
};

export default FindDoctorByPatient;
