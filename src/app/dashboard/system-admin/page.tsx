"use client";
import { Tabs } from "@/components/common";
import SystemAdminLayout from "../layout";
import { ReactElement } from "react";
import ApproveInstitution from "@/page_components/SystemAdmin/ApproveInstitutionTable";
import DesignateRoles from "@/page_components/SystemAdmin/DesignateRoles";
import { Icon } from "@/components/icon/Icon";
import LogOut from "../../../../public/assets/svgs/log-out";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/rootReducer";
import { setSystemAdminCurrentTab } from "@/lib/redux/slices/systemAdmin/systemAdminSlice";
import { useRouter } from "next/navigation";
import Practitioners from "@/page_components/SystemAdmin/Practitioners";
import ApprovedInstitutions from "@/page_components/SystemAdmin/ApprovedInstitutionsTable";

export default function SystemAdmin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const systemAdminCurrentTab = useSelector(
    (state: RootState) => state.systemAdmin.systemAdminCurrentTab
  );

  return (
    <section className="px-7 lg:px-14">
      <Tabs.Root
        defaultValue="ApproveInstitution"
        className="flex gap-10"
        value={systemAdminCurrentTab}
      >
        <Tabs.List className="lg:flex flex-col gap-6 bg-gray-4 px-4 py-8 rounded-[20px] min-h-[567px] hidden">
          <h3 className="text-xl font-bold mb-4">System Admin&apos;s Menu</h3>
          <Tabs.Trigger
            value="ApproveInstitution"
            className="flex items-center gap-4"
            onClick={() =>
              dispatch(setSystemAdminCurrentTab("ApproveInstitution"))
            }
          >
            <Icon name="Institution" />
            Approve Institution
          </Tabs.Trigger>
          <Tabs.Trigger
            value="DesignateRoles"
            className="flex items-center gap-4"
            onClick={() => dispatch(setSystemAdminCurrentTab("DesignateRoles"))}
          >
            <Icon name="DesignateRoles" />
            Designate Roles
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Approved Institutions"
            className="flex items-center gap-4"
            onClick={() =>
              dispatch(setSystemAdminCurrentTab("Approved Institutions"))
            }
          >
            <Icon name="DesignateRoles" />
            Approved Institutions
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Practitioners"
            className="flex items-center gap-4"
            onClick={() => dispatch(setSystemAdminCurrentTab("Practitioners"))}
          >
            <Icon name="DesignateRoles" />
            Practitioners
          </Tabs.Trigger>

          <span
            className="flex items-center gap-4 mt-60"
            onClick={() => router.push("/sign-in")}
          >
            <LogOut />
            Log Out
          </span>
        </Tabs.List>
        <Tabs.Content value="ApproveInstitution" className="flex-1 w-full">
          <ApproveInstitution />
        </Tabs.Content>
        <Tabs.Content value="DesignateRoles" className="flex-1">
          <DesignateRoles />
        </Tabs.Content>
        <Tabs.Content value="Practitioners" className="flex-1">
          <Practitioners />
        </Tabs.Content>
        <Tabs.Content value="Approved Institutions" className="flex-1 w-full">
          <ApprovedInstitutions />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}

SystemAdmin.getLayout = (page: ReactElement) => (
  <SystemAdminLayout>{page}</SystemAdminLayout>
);
