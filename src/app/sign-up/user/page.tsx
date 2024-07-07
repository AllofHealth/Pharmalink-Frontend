"use client";
import { Icon } from "@/components/icon/Icon";
import Image from "next/image";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { useAccount } from "wagmi";
import Button from "@/components/button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetAdminByAddress,
  useGetDoctorByAddress,
  useGetPatientByAddress,
  useGetPharmacistByAddress,
} from "@/lib/queries/auth";
import { toast } from "sonner";
import type { Admin, GetAdminNotExistMessage } from "@/lib/types";
import { useGetPractitionerInstitutions } from "@/lib/queries/institutions";

const options = [
  { value: "Patient", label: "Patient" },
  { value: "Doctor", label: "Doctor" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Institution", label: "Institution" },
  { value: "Admin", label: "System Admin" },
];

export default function UserSignUp() {
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

  const { adminData } = useGetAdminByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const { practitionerInstitutions, loading, error } =
    useGetPractitionerInstitutions({
      walletAddress: address ? address : "",
      isConnected,
    });

  console.log(patientData);
  console.log(doctorData);
  console.log(pharmacistData);
  console.log(adminData);

  const signUp = () => {
    console.log("Sign-up initiated"); // Check if this appears when button is clicked
    setIsLoading(true);

    if (selectedUserType === "Patient") {
      if (patientData?.success === 404) {
        console.log("Patient not found, routing to sign-up");
        router.push("/sign-up/patient"); // Routing to patient sign-up
      } else if (patientData?.success === 200 && "patient" in patientData) {
        toast.success("User exists");
        router.push("/dashboard/patient");
      }
    } else if (selectedUserType === "Doctor") {
      if (doctorData?.success === 404) {
        router.push("/sign-up/doctor");
      } else if (doctorData?.success === 200 && "doctor" in doctorData) {
        toast.success("Doctor exists");
        router.push("/dashboard/doctor");
      }
    } else if (selectedUserType === "Pharmacist") {
      if (pharmacistData?.success === 404) {
        router.push("/sign-up/pharmacist");
      } else if (
        pharmacistData?.success === 200 &&
        "pharmacist" in pharmacistData
      ) {
        toast.success("Pharmacist exists");
        router.push("/dashboard/pharmacist");
      }
    } else if (selectedUserType === "Institution") {
      if (
        practitionerInstitutions?.success === 200 &&
        "hospitals" in practitionerInstitutions
      ) {
        router.push("/sign-in/institution");
      } else {
        router.push("/sign-up/institution");
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
            Sign up
          </h2>
          <p className="mb-10 text-center">Choose user type</p>
          <Field label="User type">
            <Select
              options={options}
              onChange={(option) => setSelectedUserType(option?.value ?? "")}
              className="w-80 xl:w-96"
            />
          </Field>
          <Button
            variant="primary"
            className="rounded-xl text-center justify-self-center w-max mx-auto mt-7"
            onClick={() => signUp()}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
        </div>
      </section>
    </div>
  );
}
