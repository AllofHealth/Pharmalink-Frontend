"use client";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import type { CreatePharmacistValues, Institution } from "@/lib/types";
import { useAccount } from "wagmi";
import useAxios from "@/lib/hooks/useAxios";
import { useGetInstitutions } from "@/lib/queries/institutions";
import { BiLoaderAlt } from "react-icons/bi";
import { addPharmacist } from "@/actions/contract/pharmacist/pharmacist.service.c";
import { createPharmacist } from "@/lib/mutations/auth";
import { useDispatch } from "react-redux";

type InstitutionType = {
  value: number;
  label: string;
};

export default function PharmacistSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const values = Form.useWatch<CreatePharmacistValues>([], form);
  const [submittable, setSubmittable] = useState(false);
  const { address } = useAccount();
  const [pharmacistId, setPharmacistId] = useState(0);
  const { axios } = useAxios({});
  const { loading, institutions, error } = useGetInstitutions();
  const dispatch = useDispatch();

  const InstitutionType: InstitutionType[] =
    institutions?.hospitals.map((institution: Institution) => ({
      value: institution.id,
      label: institution.name,
    })) ?? [];
  console.log(values);

  const createPharmacistId = async () => {
    const result = await addPharmacist(values.hospitalIds);

    //This returns an id which will be passed to the database when calling the function
    setPharmacistId(Number(result.pharmacistId));
  };

  const handlePharmacistSignUp = async () => {
    setIsLoading(true);
    await createPharmacistId();
  };

  useEffect(() => {
    if (pharmacistId > 0) {
      createPharmacist({
        pharmacistId,
        pharmacistValues: values,
        axios,
        router,
        address,
        dispatch,
      });
    }
    console.log(pharmacistId);
  }, [pharmacistId]);

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
        name="hospitalIds"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            What institution are you representing ?
          </span>
        }
        rules={[{ required: true }]}
      >
        {loading ? (
          <BiLoaderAlt className="animate-spin text-2xl" />
        ) : institutions ? (
          <Select
            options={InstitutionType}
            className="h-14"
            placeholder="Enter your institution type"
          />
        ) : error ? (
          <p>Error fetching institutions...</p>
        ) : (
          "An error occured"
        )}
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
          placeholder="Enter your Location"
        />
      </Form.Item>

      <Form.Item
        className="mb-8"
        name="phoneNumber"
        label={
          <span className="text-[18px] font-normal text-text-black2">
            Phone number
          </span>
        }
        rules={[{ required: true }]}
      >
        <Input
          type="text"
          name="phoneNumber"
          className="border p-3 rounded-xl h-14"
          placeholder="Enter your phone number"
        />
      </Form.Item>

      <Form.Item>
        <Button
          variant="secondary"
          type="submit"
          className="w-full rounded-[40px] h-14 justify-center text-xl font-normal"
          disabled={!submittable}
          onClick={() => handlePharmacistSignUp()}
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
