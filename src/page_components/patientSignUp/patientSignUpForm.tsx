"use client";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "@/components/button/Button";
import { useAccount } from "wagmi";
import addPatient from "@/actions/contract/patient/patient.service.c";
import { createPatient } from "@/lib/mutations/auth";
import useAxios, { useAxiosInstance } from "@/lib/hooks/useAxios";
import type { CreatePatientValues } from "@/lib/types";

export interface ISignIn {
  email: string;
  password: string;
}

export default function PatientSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch<CreatePatientValues>([], form);
  const [submittable, setSubmittable] = useState(false);
  const { address } = useAccount();
  const [patientId, setPatientId] = useState(0);
  const { axiosInstance } = useAxiosInstance({});

  const createPatientId = async () => {
    const result = await addPatient();

    //This returns an id which will be passed to the database when calling the function
    setPatientId(Number(result.patientId));
    console.log(Number(result.patientId));
  };

  const handleSignIn = async () => {
    setIsLoading(true);

    await createPatientId();

    if (patientId !== 0) {
      const { data, error } = await createPatient({
        patientId,
        patientValues: values,
        axios: axiosInstance,
      });

      if (error) {
        toast.error("Failed to create patient: " + error.message); // Show error message
        setIsLoading(false);
      } else if (data) {
        toast.success("Patient created successfully!"); // Success message
        router.push("/patients"); // Navigate to another page
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Form
      onFinish={handleSignIn}
      initialValues={{ email: "" }}
      layout="vertical"
      form={form}
      autoComplete="on"
      className="mb-20 w-4/5 mx-auto xl:w-auto xl:mx-0"
    >
      <Form.Item
        className="mb-8"
        name="name"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Full Name
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="name"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your full name"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="age"
        label={
          <span className="text-[18px] font-normal text-text-black2">Age</span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="number"
          name="age"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your Age"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="email"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            What&apos;s your email?
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="email"
          name="email"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your email address"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="address"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Physical Address
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="address"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your physical address"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="city"
        label={
          <span className="text-[18px] font-normal text-text-black2">City</span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="city"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your city"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="bloodGroup"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Blood Group
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="bloodGroup"
          className="border p-3 rounded-xl h-14"
          placeholder="Provide your Blood Group"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="genotype"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Genotype
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="genotype"
          className="border p-3 rounded-xl h-14"
          placeholder="Provide your Genotype"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="walletAddress"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Wallet Address
          </span>
        }
        rules={[{ required: true }]}
        initialValue={address}
      >
        <Input
          type="text"
          name="walletAddress"
          className="border p-3 rounded-xl h-14"
          placeholder="Provide your Wallet Address"
          defaultValue={address}
        />
      </Form.Item>
      <Form.Item>
        <Button
          variant="secondary"
          type="submit"
          className="w-full rounded-[40px] h-14 justify-center text-xl font-normal"
          disabled={!submittable}
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </Form.Item>
      <p className="text-center text-[15px] font-normal text-text-black3">
        By creating an account, you agree to the Terms of use and Privacy
        Policy.{" "}
      </p>
    </Form>
  );
}
