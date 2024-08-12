"use client";
import { Tabs } from "@/components/common";
import { Icon } from "@/components/icon/Icon";
import LogOut from "../../../../public/assets/svgs/log-out";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/rootReducer";
import { setDoctorCurrentTab } from "@/lib/redux/slices/doctor/doctorSlice";
import DoctorOverview from "@/page_components/doctor/doctorOverview";
import DoctorApprovalsList from "@/page_components/doctor/doctorApprovalsList";
import PatientMedicalRecord from "@/page_components/doctor/patientMedicalRecord";
import ViewPatientMedicalRecord from "@/page_components/doctor/viewPatientMedicalRecord";
import DoctorWallet from "@/page_components/doctor/doctorWallet";
import DoctorPrivacyAndSecurity from "@/page_components/doctor/doctorPrivacyAndSecurity";
import EditPatientMedicalRecord from "@/page_components/doctor/editPatientMedicalRecord";
import EditMedicationList from "@/page_components/doctor/medicationList";

export default function Doctor() {
  const dispatch = useDispatch();
  const doctorCurrentTab = useSelector(
    (state: RootState) => state.doctor.doctorCurrentTab
  );

  return (
    <section className="px-7 lg:px-14">
      <Tabs.Root
        defaultValue="Overview"
        className="flex gap-10"
        value={doctorCurrentTab}
      >
        <Tabs.List className="lg:flex flex-col gap-6 bg-gray-4 px-4 py-8 rounded-[20px] min-h-[567px] hidden max-h-[677px]">
          <h3 className="text-xl font-bold mb-4">Doctor&apos;s Menu</h3>
          <Tabs.Trigger
            value="Overview"
            className="flex items-center gap-4"
            onClick={() => dispatch(setDoctorCurrentTab("Overview"))}
          >
            <Icon name="Overview" />
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Approvals"
            className="flex items-center gap-4"
            onClick={() => dispatch(setDoctorCurrentTab("Approvals"))}
          >
            <Icon name="Wallet" />
            Approvals
          </Tabs.Trigger>
          {/* <Tabs.Trigger
            value="Wallet"
            className="flex items-center gap-4"
            onClick={() => dispatch(setDoctorCurrentTab("Wallet"))}
          >
            <Icon name="Wallet" />
            Wallet
          </Tabs.Trigger> */}
          <Tabs.Trigger
            value="Wallet"
            className="flex items-center gap-4"
            onClick={() => dispatch(setDoctorCurrentTab("Privacy"))}
          >
            <Icon name="Privacy" />
            Privacy and Security
          </Tabs.Trigger>

          <span className="flex items-center gap-4 mt-60">
            <LogOut />
            Log Out
          </span>
        </Tabs.List>
        <Tabs.Content value="Overview" className="flex-1">
          <DoctorOverview />
        </Tabs.Content>
        <Tabs.Content value="Approvals" className="flex-1">
          <DoctorApprovalsList />
        </Tabs.Content>
        <Tabs.Content value="Patient Medical Record" className="flex-1">
          <PatientMedicalRecord />
        </Tabs.Content>
        <Tabs.Content value="EditPatientMedicalRecord" className="flex-1">
          <EditPatientMedicalRecord />
        </Tabs.Content>
        <Tabs.Content value="patientMedicalRecordDetails" className="flex-1">
          <ViewPatientMedicalRecord />
        </Tabs.Content>
        <Tabs.Content value="EditMedicationList" className="flex-1">
          <EditMedicationList />
        </Tabs.Content>
        {/* <Tabs.Content value="Wallet" className="flex-1">
          <DoctorWallet />
        </Tabs.Content> */}
        <Tabs.Content value="Privacy" className="flex-1">
          <DoctorPrivacyAndSecurity />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
