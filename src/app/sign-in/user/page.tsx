"use client";
import Button from "@/components/button/Button";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { Icon } from "@/components/icon/Icon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserSignIn() {
  const [selectedUserType, setSelectedUserType] = useState("");
  const router = useRouter();
  console.log(selectedUserType);

  const options = [
    { value: "Patient", label: "Patient" },
    { value: "Doctor", label: "Doctor" },
    { value: "Pharmacist", label: "Pharmacist" },
  ];

  const signIn = () => {
    if (selectedUserType) {
      switch (selectedUserType) {
        case "Patient":
          router.push("/dashboard/patient");
          break;
        case "Doctor":
          router.push("/dashboard/doctor");
          break;
        case "Pharmacist":
          router.push("/dashboard/pharmacist");
          break;
        default:
          // Default route if needed
          break;
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
            Sign in
          </Button>
        </div>
      </section>
    </div>
  );
}
