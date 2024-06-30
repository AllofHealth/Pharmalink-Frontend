import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Form, Input } from "antd";
import Image from "next/image";
import InstitutionAccessAndSecurity from "./institutionAccessAndSecurity";
import { useEffect, useState } from "react";
import type { UpdateInstitutionValues } from "@/lib/types";
import useAxios from "@/lib/hooks/useAxios";
import { updateInstitution } from "@/lib/mutations/institution";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/rootReducer";
import { useAccount } from "wagmi";

const InstitutionPrivacyAndSecurity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const values = Form.useWatch<UpdateInstitutionValues>([], form);
  const [submittable, setSubmittable] = useState(false);
  const { axios } = useAxios({});
  const { address } = useAccount();
  const dispatch = useDispatch();

  const currentInstitution = useSelector(
    (state: RootState) => state.institution.currentInstitution
  );

  const updateInstitutionData = async () => {
    setIsLoading(true);

    const result = await updateInstitution({
      updateInstitutionValues: values,
      axios,
      hospitalId: currentInstitution ? currentInstitution._id : "",
      adminAddress: address ? address : "",
      dispatch,
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
      <h2 className="mb-6 text-xl">Institution Profile</h2>
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
              Hospital Name
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
          name="location"
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
              onClick={() => updateInstitutionData()}
            >
              {isLoading ? "Saving" : "Save Changes"}
            </Button>
          </div>
        </Form.Item>
      </Form>
      <InstitutionAccessAndSecurity />
    </section>
  );
};

export default InstitutionPrivacyAndSecurity;
