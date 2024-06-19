import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { useGetAllDoctors } from "@/lib/queries/doctor";
import { setCurrentDoctor } from "@/lib/redux/slices/doctor/doctorSlice";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import type { AllDoctor } from "@/lib/types";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";

const FindDoctorByPatient = () => {
  const { doctors, loading, error } = useGetAllDoctors();

  const dispatch = useDispatch();

  const handleViewDoctorProfile = (doctor: AllDoctor) => {
    dispatch(setPatientCurrentTab("Doctor Profile"));
    dispatch(setCurrentDoctor(doctor));
  };
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
      {loading ? (
        <BiLoaderAlt className="text-2xl text center animate-spin" />
      ) : doctors ? (
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
          {doctors?.allDoctors?.map((doctor) => (
            <tr className="h-16 text-blue4 font-medium" key={doctor.id}>
              <td
                className="pl-2 lg:pl-7 text-xs lg:text-base flex gap-2 items-center mt-4"
                onClick={() => handleViewDoctorProfile(doctor)}
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
                {doctor.name}
              </td>
              <td className=" text-xs lg:text-base">{doctor.id}</td>
              <td className=" text-xs lg:text-base">{doctor.specialty}</td>
              <td className=" text-xs lg:text-base">{doctor.hospitalIds}</td>
              <td className=" text-xs lg:text-base">{doctor.status}</td>
            </tr>
          ))}
        </AllOfHealthTable>
      ) : error ? (
        <p>Error fetching doctors...</p>
      ) : null}
    </div>
  );
};

export default FindDoctorByPatient;
