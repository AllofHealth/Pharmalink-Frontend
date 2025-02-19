import { Icon } from "@/components/icon/Icon";
import InstitutionSignUpForm from "@/page_components/institutionSignup/institutionSignupForm";
import Image from "next/image";

export default function InstitutionSignUp() {
  return (
    <div className="flex">
      <Image
        src="/assets/images/blockchain-signup-bg.png"
        alt="Doctor using glasses in the lab"
        width={630}
        height={1021}
        className="min-h-screen object-cover object-top hidden xl:block"
      />
      <section className="min-h-screen xl:min-w-auto flex flex-col justify-center items-center flex-1">
        <Icon name="AllofHealthLogo" />
        <div>
          <h2 className="text-text-black1 text-[2rem] text-center font-medium mb-2">
            Institution Sign Up
          </h2>
          <p className="text-base font-normal text-center max-w-[460px] mb-8">
            Enhance your healthcare ecosystem
          </p>
          <InstitutionSignUpForm />
        </div>
      </section>
    </div>
  );
}
