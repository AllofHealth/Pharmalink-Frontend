import { Icon } from "@/components/icon/Icon";
import Image from "next/image";

const OurMainServices = () => {
  return (
    <section className="mt-20 w-[330px] sm:w-auto mx-auto flex flex-col justify-center items-center sm:px-14 lg:px-40">
      <h3 className="font-bold mb-7 text-4xl">
        Our <span className="gradient-text">Main Services</span>
      </h3>
      <div className="w-[330px] grid gap-6 sm:w-auto lg:grid-cols-3 sm:grid-cols-2">
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Image
            src={"/assets/images/health-management.png"}
            alt="Health data management"
            width={100}
            height={100}
          />
          <h3 className="font-bold text-2xl py-4">Health Data Management</h3>
          <p className="font-normal text-gray-2">
            Save, share and track medical history and health data
          </p>
        </article>
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Image
            src={"/assets/images/health-facilities.png"}
            alt="Health Facilities"
            width={100}
            height={100}
          />
          <h3 className="font-bold text-2xl py-4">
            Search health facilities around you
          </h3>
          <p className="font-normal text-gray-2">
            Explore trusted hospitals, pharmacies, medical laboratories, gyms
            near you.
          </p>
        </article>
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Image
            src={"/assets/images/consultation-service.png"}
            alt="Health data management"
            width={100}
            height={100}
          />
          <h3 className="font-bold text-2xl py-4">Consultation</h3>
          <p className="font-normal text-gray-2">
            Free consultation with our trusted health providers and get the best
            recomendations
          </p>
        </article>

        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Image
            src={"/assets/images/online-pharmacy.png"}
            alt="Health data management"
            width={100}
            height={100}
          />
          <h3 className="font-bold text-2xl py-4">Online pharmacy</h3>
          <p className="font-normal text-gray-2">
            Get all your medicines with us with a simple delivery system
          </p>
        </article>

        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Image
            src={"/assets/images/emergency-care.png"}
            alt="Health data management"
            width={100}
            height={100}
          />
          <h3 className="font-bold text-2xl py-4">Emergency care</h3>
          <p className="font-normal text-gray-2">
            You can get 24/7 urgent care for yourself or your children and
            your lovely family
          </p>
        </article>
      </div>
    </section>
  );
};

export default OurMainServices;
