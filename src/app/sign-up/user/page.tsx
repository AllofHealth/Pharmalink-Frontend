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
  useGetDoctorByAddress,
  useGetPatientByAddress,
  useGetPharmacistByAddress,
} from "@/lib/queries/auth";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

const options = [
  { value: "Patient", label: "Patient" },
  { value: "Doctor", label: "Doctor" },
  { value: "Pharmacist", label: "Pharmacist" },
];

export default function UserSignUp() {
  const [selectedUserType, setSelectedUserType] = useState("");
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [debouncedAddress] = useDebounce(address, 1000); // Debounce address changes by 500ms
  const [isLoading, setIsLoading] = useState(false);

  const { data: patientData } = useGetPatientByAddress({
    connected: isConnected,
    address: debouncedAddress ? debouncedAddress : "",
  });

  const { data: doctorData } = useGetDoctorByAddress({
    connected: isConnected,
    address: debouncedAddress ? debouncedAddress : "",
  });

  const { data: pharmacistData } = useGetPharmacistByAddress({
    connected: isConnected,
    address: debouncedAddress ? debouncedAddress : "",
  });

  const signUp = () => {
    console.log("Sign-up initiated"); // Check if this appears when button is clicked
    setIsLoading(true); // Start loading

    setTimeout(() => {
      // Added timeout to simulate async operation
      if (selectedUserType === "Patient") {
        if (patientData?.success === 404) {
          console.log("Patient not found, routing to sign-up");
          router.push("/sign-up/patient"); // Routing to patient sign-up
        } else if (patientData?.success === 200 && "patient" in patientData) {
          console.log("Patient found, routing to sign-in");
          router.push("/sign-in/user");
          toast.success("User exists, sign in please.");
        }
      } else if (selectedUserType === "Doctor") {
        if (doctorData?.success === 404) {
          router.push("/sign-up/health_professional");
        } else if (doctorData?.success === 200 && "doctor" in doctorData) {
          router.push("/sign-in/user");
          toast.success("Doctor exists, sign in please.");
        }
      } else if (selectedUserType === "Pharmacist") {
        if (pharmacistData?.success === 404) {
          router.push("/sign-up/health_professional");
        } else if (
          pharmacistData?.success === 200 &&
          "doctor" in pharmacistData
        ) {
          router.push("/sign-in/user");
          toast.success("Pharmacist exists, sign in please.");
        }
      }

      setIsLoading(false); // Reset loading state after logic completes
    }, 500); // Timeout to allow async operations and ensure loading state has time to be updated
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
