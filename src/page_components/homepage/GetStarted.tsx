import Button from "@/components/button/Button";

const GetStarted = () => {
  return (
    <section className="px-7 mt-20">
      <h3 className="gradient-text font-bold text-4xl lg:text-6xl text-center">
        Get started with AllOf Health
      </h3>
      <p className="text-[18px] lg:text-4xl text-center my-4 max-w-[80vw] mx-auto">
        At AllOf Health, we believe that true wellness is a holistic journey
        that encompasses mind, body, and spirit. Our mission is to empower you
        with the tools, resources, and support you need to live a healthier,
        happier life.
      </p>
      <Button
        variant="homepage"
        className="rounded-[40px] h-14 lg:h-28 lg:w-60 lg:rounded-[20px] text-center flex justify-center mx-auto"
      >
        Get Started
      </Button>
    </section>
  );
};

export default GetStarted;
