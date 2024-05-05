import Image from "next/image";

const AboutAllofHealth = () => {
  return (
    <section className="pt-10 px-7 lg:px-20">
      <h3 className="gradient-text text-3xl font-bold text-center">
        About AllOf Health
      </h3>
      <p className="text-[20px] text-gray-3 text-center py-4">
        Learn about AllOf Health. Discover our journey, principles, and
        committed team as we work to reinvent healthcare through new technology
        and personalised solutions.
      </p>
      <div className="flex justify-between gap-4">
        <Image
          src="/assets/images/about-us-img1.jpg"
          alt="Doctor in the lab"
          width={875}
          height={583}
          className="w-[70%] object-contain rounded-lg lg:rounded-[30px]"
        />
        <Image
          src="/assets/images/about-us-img2.jpg"
          alt=""
          width={395}
          height={583}
          className="w-[30%] object-contain rounded-lg lg:rounded-[30px]"
        />
      </div>
      <div className="flex justify-between gap-4 mt-7 lg:mt-14">
        <h4 className="text-2xl xl:text-5xl gradient-text font-bold">
          About us
        </h4>
        <p className="text-base lg:text-[22px] w-[222px] lg:w-[850px]">
          Welcome to AllOf Health, where innovation meets compassion. We are
          dedicated to revolutionizing health care through cutting-edge
          technology and a patient-centered approach. Our team of experts brings
          together diverse backgrounds in health care and technology to provide
          innovative solutions that enhance patient care and streamline health
          care processes. With a focus on collaboration, innovation, and impact,
          we are committed to driving positive change in the health care
          industry. Join us on our mission to transform health care for all.
        </p>
      </div>
      <div className="flex justify-between gap-4 mt-7 lg:mt-14">
        <h4 className="text-2xl xl:text-5xl gradient-text font-bold">
          Our Mission
        </h4>
        <div className="lg:w-[850px]">
          <p className="text-base lg:text-[22px] w-[222px] lg:w-[850px]">
            Our mission is to democratize health care by pioneering affordable
            and efficient medical data management services, fostering a
            healthier world for all.
          </p>
          {/* <p className="text-base lg:text-[22px] w-[222px] lg:w-[850px]">
            {" "}
            By selecting AllOf Health, you are selecting not only a healthcare
            provider, but also a partner in your journey to better health. We
            are reshaping the future of healthcare together, one idea and one
            human at a time
          </p> */}
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-7 lg:mt-14">
        <h4 className="text-2xl xl:text-5xl gradient-text font-bold">
          Our Vision
        </h4>
        <div className="lg:w-[850px]">
          <p className="text-base lg:text-[22px] w-[222px] lg:w-[850px]">
            To forge an inclusive and patient-centric health care ecosystem,
            pioneering accessibility, empathy, and innovation in every facet of
            our services, empowering healthier and happier lives globally.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutAllofHealth;
