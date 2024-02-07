import Image from "next/image";

const AboutAllofHealth = () => {
  return (
    <section className="pt-10 px-7 lg:px-20">
      <h3 className="gradient-text text-3xl font-bold text-center">
        About All Of Health
      </h3>
      <p className="text-[20px] text-gray-3 text-center py-4">
        Learn about TrustaHealth. Discover our journey, principles, and
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
      <div className="flex justify-between gap-4 mt-7">
        <h4 className="text-2xl xl:text-5xl gradient-text font-bold">
          About us
        </h4>
        <p className="text-base lg:text-[22px] w-[222px] lg:w-[850px]">
          Our joint vision at All Of Health is to revolutionise healthcare
          through technology. We have gone on a journey with a devoted team of
          medical professionals, engineers, and innovators to make great
          healthcare accessible, personalised, and empowering for all.
        </p>
      </div>
      <div className="flex justify-between gap-4 mt-7">
        <h4 className="text-2xl xl:text-5xl gradient-text font-bold">
          Our Mission
        </h4>
        <div className="lg:w-[750px]">
          <p className="text-base lg:text-[22px] w-[222px] lg:w-[750px]">
            Our aim is founded on a firm commitment to your privacy and
            security. We recognise that your health information is extremely
            personal and sensitive. As a result, we apply the strictest data
            protection standards to ensure that your faith in us is well placed.
          </p>
          <p className="text-base lg:text-[22px] w-[222px] lg:w-[750px]">
            {" "}
            By selecting All of Health, you are selecting not only a healthcare
            provider, but also a partner in your journey to better health. We
            are reshaping the future of healthcare together, one idea and one
            human at a time
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutAllofHealth;
