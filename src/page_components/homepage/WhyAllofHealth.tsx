import Image from "next/image";

const WhyAllofHealth = () => {
  return (
    <section className="mt-24 lg:flex lg:gap-20 xl:gap-40 px-14">
      <Image
        src="/assets/images/solution-desktop-img.png"
        alt=""
        width={500}
        height={700}
        className="hidden lg:block"
      />
      <div>
        <h2 className="text-[40px] font-bold w-[300px] text-center mx-auto lg:w-auto">
          Why Choose <span className="gradient-text">AllOf Health?</span>
        </h2>
        <p className="w-[300px] mx-auto mt-6 mb-10 lg:w-[400px] lg:mx-0 leading-8">
          Whether you&apos;re managing a chronic condition, striving for better
          fitness, or simply looking to improve your overall well-being,
          AllOfHealth is here to support you every step of the way.
        </p>
        <Image
          src="/assets/images/solution-desktop-img.png"
          alt="A pharmacist smiling"
          className="lg:hidden rounded-t-[150px] mx-auto my-6"
          width={267}
          height={319}
        />
        <div>
          <ul className="mx-auto grid gap-8 w-[205px] lg:grid-cols-2 lg:gap-x-10 lg:w-auto">
            <li className="mx-auto">
              <Image
                src="/assets/images/dataaccess.png"
                alt=""
                width={62}
                height={62}
              />
              <h3 className="text-[20px] font-bold my-4">Data access</h3>
              <p className="text-xs w-[205px]">
                Facilitating seamless data access and retrieval at any time and
                location.
              </p>
            </li>
            <li className="mx-auto">
              <Image
                src="/assets/images/secure-sharing.png"
                alt=""
                width={62}
                height={62}
              />
              <h3 className="text-[20px] font-bold my-4">Secure sharing</h3>
              <p className="text-xs w-[205px]">
                Ensuring sharing of medical data within and across healthcare
                institutions.
              </p>
            </li>
            <li className="mx-auto">
              <Image
                src="/assets/images/patient-centric.png"
                alt=""
                width={62}
                height={62}
              />
              <h3 className="text-[20px] font-bold my-4">Patient-centric</h3>
              <p className="text-xs w-[205px]">
                Adopting a patient-centric approach placing you at the
                center of health care.
              </p>
            </li>
            <li className="mx-auto">
              <Image
                src="/assets/images/health-care.png"
                alt=""
                width={62}
                height={62}
              />
              <h3 className="text-[20px] font-bold my-4">
                HealthCare On the Go
              </h3>
              <p className="text-xs w-[205px]">
                Access Telemedicine services: For medical consultation and
                delivery.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyAllofHealth;
