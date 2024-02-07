import Image from "next/image";

const Testimonials = () => {
  return (
    <article className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-800 mx-7 mt-10 px-10 py-6 rounded-3xl lg:w-[900px] lg:px-20 lg:h-[325px] lg:mx-auto">
      <h2 className="text-2xl font-bold text-white lg:mb-20 lg:mt-7 lg:text-center lg:text-4xl">
        What our customer are saying
      </h2>
      <p className="lg:hidden text-white py-4">
        “Our dedicated patient engagement app and web portal allow you to access
        information instantaneously (no tedeous form, long calls, or
        administrative hassle) and securely”
      </p>
      <div className="lg:flex justify-between">
        <div className="flex gap-6 items-center">
          <Image
            src="/assets/images/avatar-testimonial.png"
            alt=""
            width={133}
            height={133}
            className="w-[72px] h-[72px] rounded-[50%] object-cover border-2 border-white"
          />
          <div>
            <h4 className="text-white font-semibold">Edward Newgate</h4>
            <p className="text-white">Founder Circle</p>
          </div>
        </div>
        <p className="hidden lg:block w-[420px] text-white">
          “Our dedicated patient engagement app and web portal allow you to
          access information instantaneously (no tedeous form, long calls, or
          administrative hassle) and securely”
        </p>
      </div>
    </article>
  );
};

export default Testimonials;
