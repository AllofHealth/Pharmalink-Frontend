import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Form, Input, Select } from "antd";
import Image from "next/image";
import PharmacistAccessAndSecurity from "./pharmacistAccessAndSecurity";
import type { updatePharmacistValues } from "@/lib/types";
import { useEffect, useState } from "react";
import useAxios from "@/lib/hooks/useAxios";
import { useAccount } from "wagmi";
import { updatePharmacist } from "@/lib/mutations/pharmacist";

const PharmacistPrivacyAndSecurity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const values = Form.useWatch<updatePharmacistValues>([], form);
  const [submittable, setSubmittable] = useState(false);
  const { address, isConnected } = useAccount();
  const { axios } = useAxios({});

  const updatePharmacistData = async () => {
    setIsLoading(true);

    const result = await updatePharmacist({
      updatePharmacistValues: values,
      axios,
      address,
    })
      .then((res) => setIsLoading(false))
      .catch((err) => setIsLoading(false));
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
    <section>
      <h2 className="mb-6 text-xl">Personal Profile</h2>
      <Image
        src="/assets/images/profile_image.png"
        alt="Profile display face"
        width={144}
        height={144}
      />
      <Form
        layout="vertical"
        form={form}
        autoComplete="on"
        className="mb-20 mt-6"
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
            className="border p-3 rounded-[4px] h-10"
            placeholder="Full Name"
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
            type="number"
            name="age"
            className="border p-3 rounded-[4px] h-10"
            placeholder="Age"
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
            className="border p-3 rounded-[4px] h-10"
            placeholder="Physical address"
          />
        </Form.Item>

        <p className="text-sm text-left text-text-black3 w-full bg-blue6 flex gap-2 items-center font-semibold">
          <Icon name="Padlock" />
          By creating an account, you agree to the Terms of use and Privacy
          Policy.
        </p>
        <Form.Item className="mt-4">
          <div className="flex gap-4 justify-end">
            <Button
              variant="primary"
              type="button"
              className="w-[105px] text-[12px] lg:w-[175px] rounded-[4px] h-10 justify-center font-normal p-2"
              onClick={() => form.resetFields()}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              type="submit"
              className="w-[105px] text-[12px] lg:w-[175px] rounded-[4px] h-10 justify-center font-normal p-2"
              disabled={!submittable}
              onClick={() => updatePharmacistData()}
            >
              {isLoading ? "Saving" : "Save Changes"}
            </Button>
          </div>
        </Form.Item>
      </Form>
      <PharmacistAccessAndSecurity />
    </section>
  );
};

export default PharmacistPrivacyAndSecurity;
