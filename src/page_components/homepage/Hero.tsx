import Button from "@/components/button/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="px-5 xl:flex lg:items-center xl:px-16">
      <div className="xl:w-[60vw]">
        <h1 className="text-[32px] font-bold text-blue3 mb-4 lg:text-[64px]">
          We Are Ready to <br />
          <span className="gradient-text">Empower your health</span> <br />
          Journey
        </h1>
        <p className="mb-4 xl:text-[18px] xl:w-[70%]">
          Unlock the power of seamless medical record access, secure sharing,
          and a patient-centric system with AllOf Health – transforming
          healthcare for hospitals, pharmacies, and patients alike.
        </p>
        <Button variant="homepage" className="h-14 mx-auto xl:mx-0 mb-7">
          Get Started
        </Button>
        {/* <div className="flex items-center justify-between xl:w-[400px]">
          <div>
            <span className="text-3xl font-bold flex items-center lg:text-4xl">
              200 <span className="text-blue2">+</span>
            </span>
            <span className="font-normal text-base text-gray-1  block w-[50px]">
              Active Doctor
            </span>
          </div>
          <div>
            <span className="text-3xl font-bold flex items-center lg:text-4xl">
              15k <span className="text-blue2">+</span>
            </span>
            <span className="font-normal text-base text-gray-1  block w-[50px]">
              Active User
            </span>
          </div>
          <div>
            <span className="text-3xl font-bold flex items-center lg:text-4xl">
              50 <span className="text-blue2">+</span>
            </span>
            <span className="font-normal text-base text-gray-1  block w-[50px]">
              Active Pharmacy
            </span>
          </div>
        </div> */}
      </div>
      <Image
        src="/assets/images/hero-img.png"
        alt="Two cartoons beside a health kit"
        width={600}
        height={600}
        className="mx-auto"
      />
    </section>
  );
};

export default Hero;
