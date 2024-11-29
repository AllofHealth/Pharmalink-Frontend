"use client";
import { Tabs } from "@/components/common";
import { Icon } from "@/components/icon/Icon";
import LogOut from "../../../../public/assets/svgs/log-out";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/rootReducer";
import { setInstitutionCurrentTab } from "@/lib/redux/slices/institution/institutionSlice";
import InstitutionOverview from "@/page_components/institution/institutionOverview";
import InstitutionWallet from "@/page_components/institution/institutionWallet";
import InstitutionPrivacyAndSecurity from "@/page_components/institution/institutionPrivacyAndSecurity";
import { useRouter } from "next/navigation";

export default function Institution() {
  const dispatch = useDispatch();
  const router = useRouter();
  const institutionCurrentTab = useSelector(
    (state: RootState) => state.institution.institutionCurrentTab
  );

  return (
    <section className="px-7 lg:px-14">
      <Tabs.Root
        defaultValue="Overview"
        className="flex gap-10"
        value={institutionCurrentTab}
      >
        <Tabs.List className="lg:flex flex-col gap-6 bg-gray-4 px-4 py-8 rounded-[20px] min-h-[567px] hidden">
          <h3 className="text-xl font-bold mb-4">Institution&apos;s Menu</h3>
          <Tabs.Trigger
            value="Overview"
            className="flex items-center gap-4"
            onClick={() => dispatch(setInstitutionCurrentTab("Overview"))}
          >
            <Icon name="Overview" />
            Overview
          </Tabs.Trigger>
          {/* <Tabs.Trigger
            value="Wallet"
            className="flex items-center gap-4"
            onClick={() => dispatch(setInstitutionCurrentTab("Wallet"))}
          >
            <Icon name="Wallet" />
            Wallet
          </Tabs.Trigger> */}
          <Tabs.Trigger
            value="Wallet"
            className="flex items-center gap-4"
            onClick={() => dispatch(setInstitutionCurrentTab("Privacy"))}
          >
            <Icon name="Privacy" />
            Privacy and Security
          </Tabs.Trigger>

          <span
            className="flex items-center gap-4 mt-60"
            onClick={() => router.push("/sign-in")}
          >
            <LogOut />
            Log Out
          </span>
        </Tabs.List>
        <Tabs.Content value="Overview" className="flex-1">
          <InstitutionOverview />
        </Tabs.Content>
        {/* <Tabs.Content value="Wallet" className="flex-1">
          <InstitutionWallet />
        </Tabs.Content> */}
        <Tabs.Content value="Privacy" className="flex-1">
          <InstitutionPrivacyAndSecurity />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
