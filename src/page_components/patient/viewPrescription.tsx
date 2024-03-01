import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import { useDispatch } from "react-redux";

const ViewPrescription = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Prescription List</h1>
      <p
        className="text-base font-semibold text-gray-7 mb-4"
        onClick={() => dispatch(setPatientCurrentTab("Find Pharmacist"))}
      >
        Prescription From Dr Adewale Daniel
      </p>
      <article className="border rounded py-4 max-w-[456px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Medicine Name: Antibiotics
        </h2>
        <div className="flex justify-between items-center px-6 py-4">
          <span>
            <h3 className="text-xl font-bold">298</h3>
            <p className="text-sm font-medium">Medicine ID</p>
          </span>
          <span>
            <h3 className="text-xl font-bold">298</h3>
            <p className="text-sm font-medium">Medicine ID</p>
          </span>
        </div>
      </article>
      <article className="border rounded py-4 max-w-[944px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Description
        </h2>
        <p className="py-4 px-6">
          Take this medication by mouth with or without food as directed by your
          doctor, usually once daily.
        </p>
      </article>
      <article className="border rounded py-4 max-w-[944px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Side Effects
        </h2>
        <p className="py-4 px-6">
          Dizziness, lightheadedness, drowsiness, nausea, vomiting, tiredness,
          excess saliva/drooling, blurred vision, weight gain, constipation,
          headache, and trouble sleeping may occur. If any of these effects
          persist or worsen, consult your doctor.
        </p>
      </article>
    </div>
  );
};

export default ViewPrescription;
