import Button from "@/components/button/Button";
import type { RootState } from "@/lib/redux/rootReducer";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import { useDispatch, useSelector } from "react-redux";

const ViewPrescription = () => {
  const dispatch = useDispatch();

  const prescription = useSelector(
    (state: RootState) => state.patient.currentPrescription
  );

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">View Prescription</h1>
      <p className="text-base font-semibold text-gray-7 mb-4">
        Prescription From {prescription?.doctorName}
      </p>
      <article className="border rounded py-4 max-w-[456px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Medicine Name: {prescription?.medicineName}
        </h2>
        <div className="flex justify-between items-center px-6 py-4">
          <span>
            <h3 className="text-xl font-bold">{prescription?.medicineId}</h3>
            <p className="text-sm font-medium">Medicine ID</p>
          </span>
          <span>
            <h3 className="text-xl font-bold">{prescription?.medicineGroup}</h3>
            <p className="text-sm font-medium">Medicine Group</p>
          </span>
        </div>
      </article>
      <article className="border rounded py-4 max-w-[944px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Description
        </h2>
        <p className="py-4 px-6">{prescription?.description}</p>
      </article>
      <article className="border rounded py-4 max-w-[944px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Side Effects
        </h2>
        <p className="py-4 px-6">{prescription?.sideEffects}</p>
      </article>
      <Button
        variant="secondary"
        className="mx-auto"
        onClick={() => dispatch(setPatientCurrentTab("Find Pharmacist"))}
      >
        Share to Pharmacist
      </Button>
    </div>
  );
};

export default ViewPrescription;
