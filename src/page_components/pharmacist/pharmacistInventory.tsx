import Button from "@/components/button/Button";
import { Field } from "@/components/common/forms/Field";
import { Input } from "@/components/common/forms/Input";
import { Icon } from "@/components/icon/Icon";
import { useGetInventory } from "@/lib/queries/pharmacist";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

const PharmacistInventory = () => {
  const dispatch = useDispatch();

  const { address } = useAccount();

  const { loading, inventory, error } = useGetInventory({
    walletAddress: address ? address : "",
  });

  return (
    <div>
      <div className="flex justify-between items-center max-w-[908px] mb-8">
        <h1 className="font-bold lg:text-3xl">Inventory</h1>
        {/* <Field id="approval" label="">
          <Input
            id="approval"
            type="search"
            name="approval"
            placeholder="Search"
            className="h-10 w-20 lg:w-auto text-[10px] lg:text-sm"
          />
        </Field>
        <Button variant="primary" className="text-[8px] lg:text-sm">
          + Add New Item
        </Button> */}
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : inventory ? (
        <div className="grid gap-6 sm:flex sm:flex-wrap sm:gap-8">
          <article className="bg-white pt-2 rounded-[4px] border border-blue10 lg:w-max relative min-w-[212px] min-h-[152px]">
            <Icon
              name="BlueFirstAidBox"
              className="flex justify-center w-full mt-1 mb-2"
              width={31}
              height={31}
            />
            <h3 className="text-xl lg:text-base font-semibold text-center mb-2">
              {inventory?.inventory?.numberOfMedicine -
                inventory?.inventory?.numberOfMedicineSold ?? 0}
            </h3>
            <p className="text-sm lg:text-xs font-medium text-center mb-1">
              Medicine Available
            </p>
            <span
              className="bg-blue10 text-sm lg:text-xs w-full block text-center py-1 absolute bottom-0"
              onClick={() =>
                dispatch(setPharmacistCurrentTab("List of Medicines"))
              }
            >
              View Inventory &gt;&gt;
            </span>
          </article>
          <article
            className="bg-white pt-2 rounded-[4px] border border-green-2 lg:w-max relative min-w-[212px] min-h-[152px]"
            onClick={() => dispatch(setPharmacistCurrentTab("MedicineGroups"))}
          >
            <Icon
              name="GreenCross"
              className="flex justify-center w-full mt-1 mb-2"
              width={31}
              height={31}
            />
            <h3 className="text-xl lg:text-base font-semibold text-center mb-2">
              {inventory?.inventory?.numberOfCategory}
            </h3>
            <p className="text-sm lg:text-xs font-medium text-center mb-1">
              Medicine Groups
            </p>
            <span className="bg-green-1 text-sm lg:text-xs w-full block text-center py-1 absolute bottom-0">
              View Groups &gt;&gt;
            </span>
          </article>
          {/* <article className="bg-white pt-2 rounded-[4px] border border-red-1 lg:w-max relative min-w-[212px] min-h-[152px]">
            <Icon
              name="Warning"
              className="flex justify-center w-full mt-1 mb-2"
              width={31}
              height={31}
            />
            <h3 className="text-xl lg:text-base font-semibold text-center mb-2">
              01
            </h3>
            <p className="text-sm lg:text-xs font-medium text-center mb-1">
              Medicine Shortage
            </p>
            <span className="bg-red-1 text-sm lg:text-xs w-full block text-center py-1 absolute bottom-0">
              Resolve Now &gt;&gt;
            </span>
          </article> */}
        </div>
      ) : error ? (
        <p>Error fetching data...</p>
      ) : null}
    </div>
  );
};

export default PharmacistInventory;
