"use client";
import { Tabs } from "@/components/common";
import { Icon } from "@/components/icon/Icon";
import LogOut from "../../../../public/assets/svgs/log-out";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/rootReducer";
import { setPharmacistCurrentTab } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import PharmacistOverview from "@/page_components/pharmacist/pharmacistOverview";
import PharmacistPrescriptionList from "@/page_components/pharmacist/pharmacistPrescriptionList";
import PharmacistViewPrescription from "@/page_components/pharmacist/pharmacistViewPrescription";
import PharmacistInventory from "@/page_components/pharmacist/pharmacistInventory";
import PharmacistListOfMedicines from "@/page_components/pharmacist/pharmacistListOfMedicines";
import PharmacistInventoryMedicineDetail from "@/page_components/pharmacist/pharmacistInventoryMedicineDetail";
import PharmacistEditMedicine from "@/page_components/pharmacist/phramacistEditMedicine";
import PharmacistWallet from "@/page_components/pharmacist/pharmacistWallet";
import PharmacistPrivacyAndSecurity from "@/page_components/pharmacist/pharmacistPrivacyandSecurity";

export default function Pharmacist() {
  const dispatch = useDispatch();
  const pharmacistCurrentTab = useSelector(
    (state: RootState) => state.pharmacist.pharmacistCurrentTab
  );

  return (
    <section className="px-7 lg:px-14">
      <Tabs.Root
        defaultValue="Overview"
        className="flex gap-10"
        value={pharmacistCurrentTab}
      >
        <Tabs.List className="lg:flex flex-col gap-6 bg-gray-4 px-4 py-8 rounded-[20px] min-h-[567px] hidden max-h-max">
          <h3 className="text-xl font-bold mb-4">Pharmacist&apos;s Menu</h3>
          <Tabs.Trigger
            value="Overview"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPharmacistCurrentTab("Overview"))}
          >
            <Icon name="Overview" />
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Prescription"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPharmacistCurrentTab("Prescription"))}
          >
            <Icon name="Prescription" />
            Prescription
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Inventory"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPharmacistCurrentTab("Inventory"))}
          >
            <Icon name="FindDoctor" />
            Inventory
          </Tabs.Trigger>
          {/* <Tabs.Trigger
            value="Wallet"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPharmacistCurrentTab("Wallet"))}
          >
            <Icon name="Wallet" />
            Wallet
          </Tabs.Trigger> */}
          <Tabs.Trigger
            value="Privacy"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPharmacistCurrentTab("Privacy"))}
          >
            <Icon name="Privacy" />
            Privacy and Security
          </Tabs.Trigger>

          <span className="flex items-center gap-4 my-24">
            <LogOut />
            Log Out
          </span>
        </Tabs.List>
        <Tabs.Content value="Overview" className="flex-1">
          <PharmacistOverview />
        </Tabs.Content>
        <Tabs.Content value="Prescription" className="flex-1">
          <PharmacistPrescriptionList />
        </Tabs.Content>
        <Tabs.Content value="View Prescription" className="flex-1">
          <PharmacistViewPrescription />
        </Tabs.Content>
        <Tabs.Content value="Inventory" className="flex-1">
          <PharmacistInventory />
        </Tabs.Content>
        <Tabs.Content value="List of Medicines" className="flex-1">
          <PharmacistListOfMedicines />
        </Tabs.Content>
        <Tabs.Content value="Medicine Detail" className="flex-1">
          <PharmacistInventoryMedicineDetail />
        </Tabs.Content>
        <Tabs.Content value="Edit Medicine" className="flex-1">
          <PharmacistEditMedicine />
        </Tabs.Content>
        {/* <Tabs.Content value="Wallet" className="flex-1">
          <PharmacistWallet />
        </Tabs.Content> */}
        <Tabs.Content value="Privacy" className="flex-1">
          <PharmacistPrivacyAndSecurity />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
