"use client";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import type { CreateSystemAdminValues } from "@/lib/types";
import { useAccount } from "wagmi";
import useAxios from "@/lib/hooks/useAxios";
import { createSystemAdmin as addAdmin } from "@/actions/contract/admin/admin.service.c";
import { createSystemAdmin } from "@/lib/mutations/auth";

export interface ISignIn {
  email: string;
  password: string;
}

export default function SystemAdminSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch<CreateSystemAdminValues>([], form);
  const [submittable, setSubmittable] = useState(false);
  const { address } = useAccount();
  const [systemAdminId, setSystemAdminId] = useState(0);
  const { axios } = useAxios({});

  console.log(values);

  const createAdminId = async () => {
    const result = await addAdmin(address!);

    //This returns an id which will be passed to the database when calling the function
    setSystemAdminId(Number(result.adminId));
  };

  const handleAdminSignUp = async () => {
    setIsLoading(true);
    await createAdminId();
  };

  useEffect(() => {
    if (systemAdminId > 0) {
      createSystemAdmin({
        systemAdminId,
        systemAdminValues: values,
        axios,
        router,
        address,
      });
    }
    console.log(systemAdminId);
  }, [systemAdminId]);

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
      <Form.Item>
        <Button
          variant="secondary"
          type="submit"
          className="w-full rounded-[40px] h-14 justify-center text-xl font-normal"
          disabled={!submittable}
          onClick={() => handleAdminSignUp()}
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
