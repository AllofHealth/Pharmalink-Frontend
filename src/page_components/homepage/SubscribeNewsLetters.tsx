import Button from "@/components/button/Button";
import { Input } from "antd";

const SubscribeNewsLetters = () => {
  return (
    <article className="bg-text-black4 flex flex-col lg:gap-12 lg:px-20 lg:items-center lg:flex-row justify-between h-[238px] w-[90vw] mx-auto mt-10 rounded-xl px-6 py-8 lg:h-[190px]">
      <h2 className="text-white text-[28px]">Subscribe NewsLetters</h2>
      <div className="relative lg:flex-1 lg: max-w-[520px]">
        <Input
          type="text"
          name="SubscribeNewsLetters"
          placeholder="Enter your Email"
          className="h-[71px]"
        />
        <Button variant="homepage" className="h-[61px] absolute top-1 right-2">
          Subscribe Now
        </Button>
      </div>
    </article>
  );
};

export default SubscribeNewsLetters;
