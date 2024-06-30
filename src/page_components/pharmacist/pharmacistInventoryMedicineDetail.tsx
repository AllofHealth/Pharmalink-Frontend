import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import type { RootState } from "@/lib/redux/rootReducer";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import { useDispatch, useSelector } from "react-redux";

const PharmacistInventoryMedicineDetail = () => {
  const dispatch = useDispatch();
  const medicine = useSelector(
    (state: RootState) => state.pharmacist.currentMedicine
  );

  const trimText = (text: string, maxLength: number = 10): string => {
    return text?.toString().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  return (
    <div>
      <div className="flex gap-4 items-center justify-between">
        <div>
          <h1 className="font-bold lg:text-2xl mb-2">
            Inventory &gt; List of Medicines &gt; {medicine?.name}
          </h1>
          {/* <p className="text-xs lg:text-xl text-gray-7 mb-2">
            List of medicines available for sales.
          </p> */}
        </div>
        <Field id="approval" label="">
          <Input
            id="approval"
            type="search"
            name="approval"
            placeholder="Search"
            className="h-10 w-20 lg:w-auto text-[10px] lg:text-sm"
          />
        </Field>
        <Button
          variant="primary"
          className="text-[8px] lg:text-sm max-h-11"
          onClick={() => dispatch(setPharmacistCurrentTab("Edit Medicine"))}
        >
          Edit details
        </Button>
      </div>
      <div className="mt-4">
        <div className="xl:flex xl:gap-4 max-w-[944px]">
          <article className="border rounded py-4 xl:w-[45%] mb-6">
            <h2 className="px-6 text-base font-semibold border-b pb-2">
              Medicine Name: {medicine?.name}
            </h2>
            <div className="flex justify-between items-center px-6 py-4">
              <span>
                <h3 className="text-xl font-bold">
                  {trimText(medicine?._id ?? "")}
                </h3>
                <p className="text-sm font-medium">Medicine ID</p>
              </span>
              <span>
                <h3 className="text-xl font-bold">{medicine?.medicineGroup}</h3>
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
          <p className="py-4 px-6">{medicine?.description}</p>
        </article>
        <article className="border rounded py-4 max-w-[944px] mb-6">
          <h2 className="px-6 text-base font-semibold border-b pb-2">
            Side Effects
          </h2>
          <p className="py-4 px-6">{medicine?.sideEffects}</p>
        </article>
        {/* 
        <Button
          variant="secondary"
          className="bg-white border border-red-2 text-red-2"
        >
          Delete Medicine
        </Button> */}
      </div>
    </div>
  );
};

export default PharmacistInventoryMedicineDetail;
