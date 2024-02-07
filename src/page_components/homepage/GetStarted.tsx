import Button from "@/components/button/Button";

const GetStarted = () => {
  return (
    <section className="px-7 mt-14">
      <h3 className="gradient-text font-bold text-4xl lg:text-6xl text-center">
        Get started with TrustaHealth
      </h3>
      <p className="text-[18px] lg:text-4xl text-center my-4 max-w-[600px] mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales morbi
        tristique libero urna sem vitae. Viverra facilisis rhoncus et, nibh
        nullam vitae laoreet
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
