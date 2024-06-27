"use client";
import Button from "@/components/button/Button";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { Icon } from "@/components/icon/Icon";
import {
  useGetAdminByAddress,
  useGetDoctorByAddress,
  useGetPatientByAddress,
  useGetPharmacistByAddress,
} from "@/lib/queries/auth";
import { useGetPractitionerInstitutions } from "@/lib/queries/institutions";
import type { Admin, GetAdminNotExistMessage } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const options = [
  { value: "Patient", label: "Patient" },
  { value: "Doctor", label: "Doctor" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Institution", label: "Institution" },
  { value: "Admin", label: "Admin" },
];

export default function UserSignIn() {
  const [selectedUserType, setSelectedUserType] = useState("");
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const { patientData } = useGetPatientByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const { doctorData } = useGetDoctorByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const { pharmacistData } = useGetPharmacistByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const { practitionerInstitutions } = useGetPractitionerInstitutions({
    walletAddress: address ? address : "",
    isConnected,
  });

  const { adminData } = useGetAdminByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  console.log(patientData);
  console.log(doctorData);
  console.log(pharmacistData);

  const signIn = () => {
    console.log("Sign-up initiated"); // Check if this appears when button is clicked
    setIsLoading(true);

    if (selectedUserType === "Patient") {
      if (patientData?.success === 404) {
        console.log("Patient not found, routing to sign-up");
        router.push("/sign-up/patient"); // Routing to patient sign-up
      } else if (patientData?.success === 200 && "patient" in patientData) {
        router.push("/dashboard/patient");
      }
    } else if (selectedUserType === "Doctor") {
      if (doctorData?.success === 404) {
        router.push("/sign-up/doctor");
      } else if (doctorData?.success === 200 && "doctor" in doctorData) {
        router.push("/dashboard/doctor");
      }
    } else if (selectedUserType === "Pharmacist") {
      if (pharmacistData?.success === 404) {
        router.push("/sign-up/pharmacist");
      } else if (
        pharmacistData?.success === 200 &&
        "doctor" in pharmacistData
      ) {
        router.push("/dashboard/pharmacist");
      }
    } else if (selectedUserType === "Institution") {
      if (practitionerInstitutions?.success === 400) {
        toast.error("User is not a practitioner in the system");
      } else if (
        practitionerInstitutions?.success === 200 &&
        "hospitals" in practitionerInstitutions
      ) {
        router.push("/sign-in/institution");
      }
    } else if (selectedUserType === "Admin") {
      if ((adminData as GetAdminNotExistMessage)?.success === 404) {
        router.push("/sign-up/system_admin");
      } else if ((adminData as Admin)?.id) {
        toast.success("System Admin exists");
        router.push("/dashboard/system_admin");
      }
    }
  };

  return (
    <div className="flex">
      <Image
        src="/assets/images/blockchain-signup-bg.png"
        alt="Doctor using glasses in the lab"
        width={630}
        height={1021}
        className="h-screen object-cover object-top hidden xl:block"
      />
      <section className="min-h-screen xl:min-w-auto flex flex-col justify-center items-center flex-1">
        <Icon name="AllofHealthLogo" />
        <div>
          <h2 className="text-text-black1 text-[2rem] text-center font-medium">
            Sign in
          </h2>
          <p className="mb-10 text-center">Choose user type</p>
          <Field label="User type">
            <Select
              options={options}
              className="w-80 xl:w-96"
              onChange={(option) => setSelectedUserType(option?.value ?? "")}
            />
          </Field>
          <Button
            variant="primary"
            onClick={() => signIn()}
            className="mt-5 w-max mx-auto px-10"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
        </div>
      </section>
    </div>
  );
}
