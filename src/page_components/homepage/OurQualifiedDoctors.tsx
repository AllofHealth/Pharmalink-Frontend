import Button from "@/components/button/Button";
import Image from "next/image";

const OurQualifiedDoctors = () => {
  return (
    <section className="mt-10 px-7 lg:px-20 lg:mt-20">
      <div className="lg:flex lg:items-center lg:gap-20 xl:justify-between">
        <div>
          <h3 className="text-center lg:text-start text-4xl lg:text-5xl font-bold">
            OUR <br /> <span className="gradient-text">PARTNERS</span>
          </h3>
          <p className="text-center my-4 lg:text-start lg:w-[483px]">
            Learn about AllOf Health. Discover our journey, principles, and
            committed team as we work to reinvent healthcare through new
            technology and personalised solutions.
          </p>
          <div className="flex justify-between items-center sm:hidden">
            <div className="bg-bg-lab flex flex-col pt-10 items-center h-[167px] bg-cover bg-no-repeat">
              <span className="text-white">Orthopedy</span>
              <span className="text-white">Dr Segun Aderibigbe</span>
            </div>
            <Image
              src="/assets/images/qualified-doctor.png"
              alt="Doctor headshot"
              width={150}
              height={200}
              className="lg:hidden"
            />
          </div>
          <div className="sm:flex justify-between items-center hidden pb-4">
            <div className="bg-bg-lab flex flex-col pt-10 items-center h-[295px] w-[465px] bg-cover bg-no-repeat">
              <span className="text-white text-3xl">Orthopedy</span>
              <span className="text-white text-4xl">Dr Segun Aderibigbe</span>
            </div>
          </div>
        </div>
        <Image
          src="/assets/images/qualified-doctor-desktop.png"
          alt="Doctor headshot"
          width={515}
          height={503}
          className="hidden lg:block"
        />
      </div>
      <Button variant="homepage" className="h-14 mx-auto lg:mx-0">
        Get started as a Doctor
      </Button>
    </section>
  );
};

export default OurQualifiedDoctors;
