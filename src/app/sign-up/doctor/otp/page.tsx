"use client";
import Button from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import OtpSuccessModal from "@/components/modal/auth/OtpSuccessModal";
import type { RootState } from "@/lib/redux/rootReducer";
import { toggleOtpSuccessModal } from "@/lib/redux/slices/modals/modalSlice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const otpSuccessModalRef = useRef<HTMLDivElement | null>(null);
  const [otpSuccessModalContainer, setOtpSuccessModalContainer] =
    useState<HTMLElement | null>(null);

  const isOtpSuccessModalOpen = useSelector(
    (state: RootState) => state.modal.isOtpSuccessModalOpen
  );

  const handleSuccessOtp = () => {
    dispatch(toggleOtpSuccessModal());
  };

  useEffect(() => {
    if (otpSuccessModalRef.current) {
      setOtpSuccessModalContainer(otpSuccessModalRef.current);
    }
  }, [isOtpSuccessModalOpen]);

  return (
    <div className="flex">
      <Image
        src="/assets/images/blockchain-signup-bg.png"
        alt="Doctor using glasses in the lab"
        width={630}
        height={1021}
        className="h-screen object-cover object-top hidden xl:block"
      />
      <section className="min-h-screen my-10 max-w-[80vw] mx-auto xl:min-w-auto flex flex-col justify-center items-center flex-1">
        <Icon name="AllofHealthLogo" />
        <div className="flex flex-col">
          <h2 className="text-text-black1 text-[1.6rem] sm:text-[2rem] text-center font-medium mb-2">
            Enter your verification code
          </h2>
          <p className="text-xs xl:text-base font-normal text-center max-w-[460px] mb-8">
            Enter the code we sent to{" "}
            <span className="text-[#93C1F9]">balablue@gmail.com</span>
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => <input {...props} />}
            inputType="number"
            inputStyle="border !w-[70px] h-[56px] rounded-xl ml-4"
            containerStyle={"h-[56px] self-center"}
          />
          <p className="text-sm xl:text-base text-center mt-4">
            Time remaining <span className="font-semibold">2:59 mins</span>
          </p>
          <p className="text-sm xl:text-base text-center my-4">
            Didn’t receive the email?{" "}
            <span className="text-[#93C1F9]">Click to resend</span>
          </p>

          <Button
            variant="secondary"
            type="submit"
            className="w-full text-base xl:text-xl  rounded-[40px] h-14 justify-center font-normal"
            onClick={() => handleSuccessOtp()}
          >
            Continue
          </Button>

          <p className="text-center text-sm xl:text-base  font-normal text-text-black3 mt-4">
            By creating an account, you agree to the Terms of use and Privacy
            Policy.{" "}
          </p>
        </div>
      </section>
      <div ref={otpSuccessModalRef}>
        <OtpSuccessModal
          container={otpSuccessModalContainer!}
          title="Succesful!"
        />
      </div>
    </div>
  );
}
