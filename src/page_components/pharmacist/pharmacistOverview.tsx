import { Icon } from "@/components/icon/Icon";
import { useGetPharmacistByAddress } from "@/lib/queries/auth";
import { useGetAllMedicines, useGetInventory } from "@/lib/queries/pharmacist";
import type { GetPharmacistMessage } from "@/lib/types";
import { error } from "console";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import { useAccount } from "wagmi";

const PharmacistOverview = () => {
  const { isConnected, address } = useAccount();

  const {
    loading: loadingPharmacistData,
    pharmacistData,
    error: errorPharmacistData,
  } = useGetPharmacistByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const {
    loading: loadingInventory,
    inventory,
    error: errorInventory,
  } = useGetInventory({
    walletAddress: address ? address : "",
  });

  const totalMedications = inventory?.inventory?.products.reduce(
    (total, product) => total + product.medications.length,
    0
  );

  return (
    <section>
      {loadingPharmacistData ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : pharmacistData ? (
        <>
          <div className="my-4">
            <span className="text-base font-bold lg:text-3xl lg:font-extrabold">
              Welcome, Pharm.{" "}
              {(pharmacistData as GetPharmacistMessage).pharmacist.name}
            </span>
            <p className="text-xs lg:text-base text-gray-7 my-2">
              Have a nice day at work today, Pharm!
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#00758A] via-[#47CDD4] to-[#017489] flex justify-between rounded-2xl pl-4 mb-4 lg:pl-10 items-center">
            <div className="py-4 pr-2 h-max lg:pt-10">
              <div className="flex items-center gap-4 mb-4 lg:mb-8">
                <Icon name="Asset" />
                {/* <div>
                  <span className="text-base font-medium lg:text-2xl text-white">
                    Total assets
                  </span>
                  <p className="text-2xl lg:text-[40px] font-bold text-white">
                    $ 87.743
                  </p>
                </div> */}
              </div>
              <div className="grid grid-cols-2 xl:flex gap-2 lg:gap-4">
                <article className="bg-white w-20 pt-2 rounded-[4px] border border-green-2 lg:w-max lg: min-w-[110px]">
                  <Icon
                    name="GreenCross"
                    className="flex justify-center w-full my-1"
                  />
                  <h3 className="text-[12px] lg:text-base font-semibold text-center">
                    Good
                  </h3>
                  <p className="text-[8px] lg:text-xs font-medium text-center mb-1">
                    Inventory Access
                  </p>
                  <span className="bg-green-1 text-[5px] lg:text-xs w-full block text-center py-1 lg:p">
                    View Detailed Report &gt;&gt;
                  </span>
                </article>
                {loadingInventory ? (
                  <div className="flex justify-center items-center mt-10">
                    <BiLoaderAlt className="text-2xl text center animate-spin" />
                  </div>
                ) : inventory ? (
                  <article className="bg-white w-20 pt-2 rounded-[4px] border border-blue10 lg:w-max lg: min-w-[110px]">
                    <Icon
                      name="BlueFirstAidBox"
                      className="flex justify-center w-full my-1"
                    />
                    <h3 className="text-[12px] lg:text-base font-semibold text-center">
                      {totalMedications ?? 0}
                    </h3>
                    <p className="text-[8px] lg:text-xs font-medium text-center mb-1 px-2">
                      Medicine Available
                    </p>
                    <span className="bg-blue10 text-[5px] lg:text-xs w-full block text-center py-1 lg:p">
                      View Inventory &gt;&gt;
                    </span>
                  </article>
                ) : errorInventory ? (
                  <p>Error fetching medicines...</p>
                ) : null}
                {/* <article className="bg-white w-20 pt-2 rounded-[4px] border border-yellow-1 lg:w-max lg: min-w-[110px]">
                  <Icon
                    name="Revenue"
                    className="flex justify-center w-full my-1"
                  />
                  <h3 className="text-[12px] lg:text-base font-semibold text-center">
                    $250.00
                  </h3>
                  <p className="text-[8px] lg:text-xs font-medium text-center mb-1">
                    Revenue: 02/05/24
                  </p>
                  <span className="bg-yellow-1 text-[5px] lg:text-xs w-full block text-center py-1 lg:p">
                    View Detailed Report &gt;&gt;
                  </span>
                </article> */}
                {/* <article className="bg-white w-20 pt-2 rounded-[4px] border border-red-1 lg:w-max lg: min-w-[110px]">
                  <Icon
                    name="Warning"
                    className="flex justify-center w-full my-1"
                  />
                  <h3 className="text-[12px] lg:text-base font-semibold text-center">
                    01
                  </h3>
                  <p className="text-[8px] lg:text-xs font-medium text-center mb-1">
                    Medicine Shortage
                  </p>
                  <span className="bg-red-1 text-[5px] lg:text-xs w-full block text-center py-1 lg:p">
                    View Detailed Report &gt;&gt;
                  </span>
                </article> */}
              </div>
            </div>
            <Image
              src="/assets/images/emergency.png"
              alt="A Doctor"
              width={391}
              height={328}
              className="rounded-tr-2xl rounded-br-2xl w-2/5 object-cover object-center"
            />
          </div>
          {loadingInventory ? (
            <div className="flex justify-center items-center mt-10">
              <BiLoaderAlt className="text-2xl text center animate-spin" />
            </div>
          ) : inventory ? (
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-12">
              <article className="border rounded py-4 max-w-[456px] mb-6">
                <h2 className="px-6 text-base font-semibold border-b pb-2">
                  Inventory
                </h2>
                <div className="flex justify-between items-center px-6 py-4">
                  <span>
                    <h3 className="text-xl font-bold">
                      {inventory?.inventory?.numberOfMedicine ?? 0}
                    </h3>
                    <p className="text-sm font-medium">
                      Total number of medicine
                    </p>
                  </span>
                  <span>
                    <h3 className="text-xl font-bold">
                      {inventory?.inventory?.products.length ?? 0}
                    </h3>
                    <p className="text-sm font-medium">Medicine Group</p>
                  </span>
                </div>
              </article>
              <article className="border rounded py-4 max-w-[456px] mb-6">
                <h2 className="px-6 text-base font-semibold border-b pb-2">
                  Quick Report
                </h2>
                <div className="flex justify-between items-center px-6 py-4">
                  <span>
                    <h3 className="text-xl font-bold">
                      {inventory?.inventory?.numberOfMedicineSold ?? 0}
                    </h3>
                    <p className="text-sm font-medium">Qty of Med sold</p>
                  </span>
                </div>
              </article>
              {/* <article className="border rounded py-4 max-w-[456px] mb-6">
                <h2 className="px-6 text-base font-semibold border-b pb-2">
                  Customers
                </h2>
                <div className="flex justify-between items-center px-6 py-4">
                  <span>
                    <h3 className="text-xl font-bold">845</h3>
                    <p className="text-sm font-medium">Total no of Customers</p>
                  </span>
                  <span>
                    <h3 className="text-xl font-bold">Adalimumab</h3>
                    <p className="text-sm font-medium">
                      Frequently bought Item
                    </p>
                  </span>
                </div>
              </article> */}
            </div>
          ) : errorInventory ? (
            <p>Error fetching inventory...</p>
          ) : null}
        </>
      ) : errorPharmacistData ? (
        <p>Error fetching data...</p>
      ) : null}
    </section>
  );
};

export default PharmacistOverview;
