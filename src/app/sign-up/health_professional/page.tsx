import { Icon } from "@/components/icon/Icon";
import HealthProfessionalSignUpForm from "@/page_components/health_professionalSignUp/HealthProfessionalSignupForm";
import Image from "next/image";

export default function HealthProfessionalSignUp() {
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
            Create an account
          </h2>
          <p className="text-base font-normal text-center max-w-[460px] mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lobortis maximus
          </p>
          <HealthProfessionalSignUpForm />
        </div>
      </section>
    </div>
  );
}
