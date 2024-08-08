import Button from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="px-3 xl:flex lg:items-center xl:px-16">
      <div className="lg:w-[70vw] xl:w-[60vw] lg:mx-auto xl:mx-0">
        <h1 className="text-[30px] font-bold gradient-text lg:mx-auto mb-4 lg:text-[64px]">
          Your health data, seamlessly connected
        </h1>
        <p className="mb-8 xl:text-[24px] lg:text-center lg:mx-auto xl:mx-0 xl:text-start xl:w-[90%]">
          Unlock the power of seamless medical record access, secure sharing,
          and a patient-centric system with AllOf Health – transforming
          healthcare for health institutions, health professionals
          and patients alike.
        </p>
        <Link href={"/sign-in"} className="">
          <Button variant="homepage" className="h-14 mx-auto xl:mx-0 mb-7">
            Get Started
          </Button>
        </Link>

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
        src="/assets/images/updated-heroimg.png"
        alt="Two cartoons beside a health kit"
        width={600}
        height={600}
        className="mx-auto"
      />
    </section>
  );
};

export default Hero;
