"use client";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import { useAccount } from "wagmi";
import useAxios from "@/lib/hooks/useAxios";
import { addPatientFamilyMember } from "@/actions/contract/patient/patient.service.c";
import type { CreateFamilyMemberValues, GetPatientMessage } from "@/lib/types";
import { useGetPatientByAddress } from "@/lib/queries/auth";
import { createFamilyMember } from "@/lib/mutations/patient";
import { useDispatch } from "react-redux";

export default function FamilyRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch<CreateFamilyMemberValues>([], form);
  const [submittable, setSubmittable] = useState(false);
  const { address, isConnected } = useAccount();
  const [familyMemberId, setFamilyMemberId] = useState(0);
  const { axios } = useAxios({});
  const dispatch = useDispatch();
  const { patientData } = useGetPatientByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const createFamilyMemberId = async () => {
    const result = await addPatientFamilyMember(
      (patientData as GetPatientMessage)?.patient?.id
    );

    //This returns an id which will be passed to the database when calling the function
    setFamilyMemberId(Number(result.familyMemberId));
  };

  const handleCreateFamilyMember = async () => {
    setIsLoading(true);
    await createFamilyMemberId();
  };

  useEffect(() => {
    if (familyMemberId > 0) {
      createFamilyMember({
        familyMemberId,
        familyMemberValues: values,
        axios,
        router,
        address,
        dispatch,
      });
    }
    console.log(familyMemberId);
  }, [familyMemberId]);

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
    <div className="max-w-[550px]">
      <h1 className="font-bold lg:text-3xl mb-4 lg:mb-6">
        Family Registration
      </h1>
      <Form
        layout="vertical"
        form={form}
        autoComplete="on"
        className="mb-20 mx-auto xl:w-auto xl:mx-0"
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
          name="relationship"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Relationship
            </span>
          }
          rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="relationship"
            className="border p-3 rounded-xl h-14"
            placeholder="What’s your relationship with patient?"
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
          name="email"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Email
            </span>
          }
          rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="email"
            className="border p-3 rounded-xl h-14"
            placeholder="Enter your email address"
          />
        </Form.Item>

        <Form.Item
          className="mb-8"
          name="age"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Age
            </span>
          }
          rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="age"
            className="border p-3 rounded-xl h-14"
            placeholder="Enter your Age"
          />
        </Form.Item>

        <Form.Item
          className="mb-8"
          name="dob"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Date of Birth
            </span>
          }
          rules={[{ required: true }]}
        >
          <Input
            type="date"
            name="dob"
            className="border p-3 rounded-xl h-14"
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
            placeholder="Enter your Blood Group"
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
            placeholder="Enter your Genotype"
          />
        </Form.Item>
        <Form.Item>
          <Button
            variant="secondary"
            type="submit"
            className="w-full rounded-[40px] h-14 justify-center text-xl font-normal"
            disabled={!submittable}
            onClick={() => handleCreateFamilyMember()}
          >
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
