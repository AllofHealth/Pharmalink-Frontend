"use client";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import type { CreateInstitutionValues } from "@/lib/types";
import { useAccount } from "wagmi";
import useAxios from "@/lib/hooks/useAxios";
import { createHospital } from "@/actions/contract/hospital/hospital.service.c";
import { createInstitution } from "@/lib/mutations/auth";

export interface ISignIn {
  email: string;
  password: string;
}

export default function InstitutionSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch<CreateInstitutionValues>([], form);
  const [submittable, setSubmittable] = useState(false);
  const { address } = useAccount();
  const [institutionId, setInstitutionId] = useState(0);
  const { axios } = useAxios({});

  const createInstitutionId = async () => {
    const result = await createHospital();

    //This returns an id which will be passed to the database when calling the function
    setInstitutionId(Number(result.hospitalId));
  };

  const handleInstitutionSignUp = async () => {
    setIsLoading(true);
    await createInstitutionId();
  };

  useEffect(() => {
    if (institutionId > 0) {
      createInstitution({
        institutionId,
        institutionValues: values,
        axios,
        router,
        address,
      });
    }
    console.log(institutionId);
  }, [institutionId]);

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
            Institution name
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="name"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your the institution’s name"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="location"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Location
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="location"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your location"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="email"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Email address
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
        name="phoneNo"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Phone number
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="phoneNo"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your phone number"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="description"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Description
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="description"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your description"
        />
      </Form.Item>

      <Form.Item>
        <Button
          variant="secondary"
          type="submit"
          className="w-full rounded-[40px] h-14 justify-center text-xl font-normal"
          disabled={!submittable}
          onClick={() => handleInstitutionSignUp()}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </Form.Item>
      <p className="text-center text-[15px] font-normal text-text-black3">
        By creating an account, you agree to the Terms of use and Privacy
        Policy.{" "}
      </p>
    </Form>
  );
}
