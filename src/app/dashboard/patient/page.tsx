"use client";
import { Tabs } from "@/components/common";
import { Icon } from "@/components/icon/Icon";
import LogOut from "../../../../public/assets/svgs/log-out";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/rootReducer";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import PatientOverview from "@/page_components/patient/patientOverview";
import PrescriptionList from "@/page_components/patient/prescriptionList";
import ViewPrescription from "@/page_components/patient/viewPrescription";
import FindPharmacist from "@/page_components/patient/findPharmacist";
import FindDoctorByPatient from "@/page_components/patient/findDoctor";
import DoctorProfile from "@/page_components/patient/doctorsProfile";
import ShareRecordToDoctor from "@/page_components/patient/shareRecordToDoctor";
import PatientWallet from "@/page_components/patient/patientWallet";
import FamilyRegistration from "@/page_components/patient/familyRegistration";
import FamilyRegistrationForm from "@/page_components/patient/familyRegistrationForm";
import PatientPrivacyAndSecurity from "@/page_components/patient/patientPrivacyAndSecurity";

export default function PAtient() {
  const dispatch = useDispatch();
  const patientCurrentTab = useSelector(
    (state: RootState) => state.patient.patientCurrentTab
  );

  return (
    <section className="px-7 lg:px-14">
      <Tabs.Root
        defaultValue="Overview"
        className="flex gap-10"
        value={patientCurrentTab}
      >
        <Tabs.List className="lg:flex flex-col gap-6 bg-gray-4 px-4 py-8 rounded-[20px] min-h-[567px] hidden max-h-max">
          <h3 className="text-xl font-bold mb-4">Patient&apos;s Menu</h3>
          <Tabs.Trigger
            value="Overview"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPatientCurrentTab("Overview"))}
          >
            <Icon name="Overview" />
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Prescription"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPatientCurrentTab("Prescription"))}
          >
            <Icon name="Prescription" />
            Prescription
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Find Doctor"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPatientCurrentTab("Find Doctor"))}
          >
            <Icon name="FindDoctor" />
            Find Doctor
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Wallet"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPatientCurrentTab("Wallet"))}
          >
            <Icon name="Wallet" />
            Wallet
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Family Registration"
            className="flex items-center gap-4"
            onClick={() =>
              dispatch(setPatientCurrentTab("Family Registration"))
            }
          >
            <Icon name="FamilyReg" />
            Family Registration
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Emergency"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPatientCurrentTab("Emergency"))}
          >
            <Icon name="Emergency" />
            Emergency
          </Tabs.Trigger>
          <Tabs.Trigger
            value="Privacy"
            className="flex items-center gap-4"
            onClick={() => dispatch(setPatientCurrentTab("Privacy"))}
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
          <PatientOverview />
        </Tabs.Content>
        <Tabs.Content value="Prescription" className="flex-1">
          <PrescriptionList />
        </Tabs.Content>
        <Tabs.Content value="View Prescription" className="flex-1">
          <ViewPrescription />
        </Tabs.Content>
        <Tabs.Content value="Find Pharmacist" className="flex-1">
          <FindPharmacist />
        </Tabs.Content>
        <Tabs.Content value="Find Doctor" className="flex-1">
          <FindDoctorByPatient />
        </Tabs.Content>
        <Tabs.Content value="Doctor Profile" className="flex-1">
          <DoctorProfile />
        </Tabs.Content>
        <Tabs.Content value="ShareRecordToDoctor" className="flex-1">
          <ShareRecordToDoctor />
        </Tabs.Content>
        <Tabs.Content value="Wallet" className="flex-1">
          <PatientWallet />
        </Tabs.Content>
        <Tabs.Content value="Family Registration" className="flex-1">
          <FamilyRegistration />
        </Tabs.Content>
        <Tabs.Content value="Family Registration Form" className="flex-1">
          <FamilyRegistrationForm />
        </Tabs.Content>
        <Tabs.Content value="Emergency" className="flex-1">
          Emergency
        </Tabs.Content>
        <Tabs.Content value="Privacy" className="flex-1">
          <PatientPrivacyAndSecurity />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
