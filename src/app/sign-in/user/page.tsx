"use client";
import { Select } from "@/components/common";
import { Field } from "@/components/common/forms/Field";
import { Icon } from "@/components/icon/Icon";
import Image from "next/image";

export default function UserSignIn() {
  const options = [
    { value: "Patient", label: "Patient" },
    { value: "Doctor", label: "Doctor" },
    { value: "Pharmacist", label: "Pharmacist" },
  ];
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
            <Select options={options} className="w-80 xl:w-96" />
          </Field>
        </div>
      </section>
    </div>
  );
}
