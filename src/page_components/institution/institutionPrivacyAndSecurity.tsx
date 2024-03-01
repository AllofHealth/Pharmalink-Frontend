import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Form, Input, Select } from "antd";
import Image from "next/image";
import InstitutionAccessAndSecurity from "./institutionAccessAndSecurity";

const InstitutionPrivacyAndSecurity = () => {
  const [form] = Form.useForm();

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
        initialValues={{ email: "" }}
        layout="vertical"
        form={form}
        autoComplete="on"
        className="mb-20 mt-6"
      >
        <Form.Item
          className="mb-8"
          name="first_name"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              First Name
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="first_name"
            className="border p-3 rounded-[4px] h-10"
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          className="mb-8"
          name="last_name"
          label={
            <span className="text-[18px] font-normal text-text-black2">
              Last Name
            </span>
          }
          // rules={[{ required: true }]}
        >
          <Input
            type="text"
            name="last_name"
            className="border p-3 rounded-[4px] h-10"
            placeholder="Last Name"
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
          // rules={[{ required: true }]}
        >
          <Input
            type="date"
            name="dob"
            className="border p-3 rounded-[4px] h-10"
            placeholder="Date of birth"
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
              type="submit"
              className="w-[105px] text-[12px] lg:w-[175px] rounded-[4px] h-10 justify-center font-normal p-2"
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              type="submit"
              className="w-[105px] text-[12px] lg:w-[175px] rounded-[4px] h-10 justify-center font-normal p-2"
            >
              Save Changes
            </Button>
          </div>
        </Form.Item>
      </Form>
      <InstitutionAccessAndSecurity />
    </section>
  );
};

export default InstitutionPrivacyAndSecurity;
