import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { setDoctorCurrentTab } from "@/lib/redux/slices/doctor/doctorSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

const DoctorApprovalsList = () => {
  const patients = [
    {
      patientName: "John Doe",
      approvalType: "View and Modify",
    },
    {
      patientName: "John Doe",
      approvalType: "View and Modify",
    },
    {
      patientName: "John Doe",
      approvalType: "View and Modify",
    },
    {
      patientName: "John Doe",
      approvalType: "View and Modify",
    },
    {
      patientName: "John Doe",
      approvalType: "View and Modify",
    },
  ];

  const dispatch = useDispatch();
  return (
    <div className="max-w-[600px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold lg:text-3xl lg:mb-6">Approval List</h1>
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
        labels={["Patient's Name", "Approval type"]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {patients.map((patient, index) => (
          <tr className="h-16 text-blue4 font-medium" key={index}>
            <td
              className="pl-2 lg:pl-7 text-xs lg:text-base flex gap-2 items-center mt-4"
              onClick={() =>
                dispatch(setDoctorCurrentTab("Patient Medical Record"))
              }
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
              {patient.patientName}
            </td>
            <td className=" text-xs lg:text-base">{patient.approvalType}</td>
          </tr>
        ))}
      </AllOfHealthTable>
    </div>
  );
};

export default DoctorApprovalsList;
