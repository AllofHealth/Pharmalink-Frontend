import { Icon } from "@/components/icon/Icon";

const OurMainServices = () => {
  return (
    <section className="mt-10 w-[330px] sm:w-auto mx-auto flex flex-col justify-center items-center sm:px-14 lg:px-40">
      <h3 className="font-bold mb-7 text-4xl">
        Our <span className="gradient-text">Main Services</span>
      </h3>
      <div className="w-[330px] grid gap-6 sm:w-auto lg:grid-cols-3 sm:grid-cols-2">
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Icon name="SearchDoctor" />
          <h3 className="font-bold text-2xl py-4">Search doctor</h3>
          <p className="font-normal text-gray-2">
            Choose your doctor from thousands of specialist, general, and
            trusted hospitals
          </p>
        </article>
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Icon name="Drugs" />
          <h3 className="font-bold text-2xl py-4">Online pharmacy</h3>
          <p className="font-normal text-gray-2">
            Get all your medicines with us with a simple delivery system
          </p>
        </article>
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Icon name="Consultation" />
          <h3 className="font-bold text-2xl py-4">Consultation</h3>
          <p className="font-normal text-gray-2">
            Free consultation with our trusted doctors and get the best
            recomendations
          </p>
        </article>
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Icon name="DetailsInfo" />
          <h3 className="font-bold text-2xl py-4">Details info</h3>
          <p className="font-normal text-gray-2">
            Free consultation with our trusted doctors and get the best
            recomendations
          </p>
        </article>
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Icon name="FirstAidBox" />
          <h3 className="font-bold text-2xl py-4">Emergency care</h3>
          <p className="font-normal text-gray-2">
            You can get 24/7 urgent care for yourself or your children and your
            lovely family
          </p>
        </article>
        <article className="shadow-sm bg-white rounded-[20px] p-6">
          <Icon name="Tracking" />
          <h3 className="font-bold text-2xl py-4">Tracking</h3>
          <p className="font-normal text-gray-2">
            Track and save your medical history and health data
          </p>
        </article>
      </div>
    </section>
  );
};

export default OurMainServices;
