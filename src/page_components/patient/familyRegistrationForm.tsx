"use client";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Button from "@/components/button/Button";

export interface ISignIn {
  email: string;
  password: string;
}

export default function FamilyRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [submittable, setSubmittable] = useState(false);

  const onFinish = (values: any) => {
    handleSignIn(values);
  };

  const handleSignIn = async (data: ISignIn) => {
    const { email, password } = data;
    setIsLoading(true);
    // router.prefetch("./app/user-management")
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/app/user-management?usertype=verified_users",
      redirect: false,
      type: "admin",
    });

    if (res?.ok) {
      router.push(res.url!);
      setIsLoading(false);
    } else {
      toast.error(res?.error);
      setIsLoading(false);
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

  const RelationshipsType = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
  ];

  return (
    <div className="max-w-[550px]">
      <h1 className="font-bold lg:text-3xl mb-4 lg:mb-6">
        Family Registration
      </h1>
      <Form
        onFinish={onFinish}
        initialValues={{ email: "" }}
        layout="vertical"
        form={form}
        autoComplete="on"
        className="mb-20 mx-auto xl:w-auto xl:mx-0"
      >
        <Form.Item
          className="mb-8"
          name="full_name"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Full Name
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="full_name"
            className="border p-3 rounded-xl h-14"
            placeholder="Enter your full name"
          />
        </Form.Item>

        <Form.Item
          className="mb-8"
          name="institution_type"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Relationships
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Select
            options={RelationshipsType}
            className="h-14"
            placeholder="How is the person related to you?"
          />
        </Form.Item>
        <Form.Item
          className="mb-8"
          name="physical_address"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Physical Address
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="physical_address"
            className="border p-3 rounded-xl h-14"
            placeholder="Enter your physical address"
          />
        </Form.Item>

        <Form.Item
          className="mb-8"
          name="city"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              City
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="physical_address"
            className="border p-3 rounded-xl h-14"
            placeholder="Enter your city"
          />
        </Form.Item>

        <Form.Item
          className="mb-8"
          name="phone_number"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Phone number
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="phone_number"
            className="border p-3 rounded-xl h-14"
            placeholder="Enter your phone number"
          />
        </Form.Item>

        <Form.Item
          className="mb-8"
          name="wallet_address"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Wallet Address
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Input
            type="date"
            name="d.o.b"
            className="border p-3 rounded-xl h-14"
          />
        </Form.Item>
        <Form.Item>
          <Button
            variant="secondary"
            type="submit"
            className="w-full rounded-[40px] h-14 justify-center text-xl font-normal"
            // disabled={!submittable}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
