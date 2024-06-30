import type { RootState } from "@/lib/redux/rootReducer";
import { useSelector } from "react-redux";

const PharmacistViewPrescription = () => {
  const currentPrescription = useSelector(
    (state: RootState) => state.pharmacist.currentPrescription
  );

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Prescription List</h1>
      <p className="text-base font-semibold text-gray-7 mb-4">
        Prescription From {currentPrescription?.doctorName}
      </p>
      <div className="xl:flex xl:gap-4 max-w-[944px]">
        <article className="border rounded py-4 xl:w-[45%] mb-6">
          <h2 className="px-6 text-base font-semibold border-b pb-2">
            Medicine Name: {currentPrescription?.medicineName}
          </h2>
          <div className="flex justify-between items-center px-6 py-4">
            <span>
              <h3 className="text-xl font-bold">
                {currentPrescription?.medicineId}
              </h3>
              <p className="text-sm font-medium">Medicine ID</p>
            </span>
            <span>
              <h3 className="text-xl font-bold">
                {currentPrescription?.medicineGroup}
              </h3>
              <p className="text-sm font-medium">Medicine Group</p>
            </span>
          </div>
        </article>
        {/* <article className="border rounded xl:w-[45%] py-4 mb-6">
          <h2 className="px-6 text-base font-semibold border-b pb-2">
            Inventory
          </h2>
          <div className="flex justify-between items-center px-6 py-4">
            <span>
              <h3 className="text-xl font-bold">298</h3>
              <p className="text-sm font-medium">Lifetime Supply</p>
            </span>
            <span>
              <h3 className="text-xl font-bold">290</h3>
              <p className="text-sm font-medium">Lifetime Sales</p>
            </span>
            <span>
              <h3 className="text-xl font-bold">08</h3>
              <p className="text-sm font-medium">Stock Left</p>
            </span>
          </div>
        </article> */}
      </div>

      <article className="border rounded py-4 max-w-[944px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Description
        </h2>
        <p className="py-4 px-6">{currentPrescription?.description}</p>
      </article>
      <article className="border rounded py-4 max-w-[944px] mb-6">
        <h2 className="px-6 text-base font-semibold border-b pb-2">
          Side Effects
        </h2>
        <p className="py-4 px-6">{currentPrescription?.sideEffects}</p>
      </article>
    </div>
  );
};

export default PharmacistViewPrescription;
