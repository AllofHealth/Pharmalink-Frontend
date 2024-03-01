import Button from "@/components/button/Button";

const PatientAccessAndSecurity = () => {
  return (
    <div className="border-t pt-4">
      <h2 className="text-base lg:text-3xl font-semibold mb-4">
        Access and Security
      </h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm lg:text-xl font-semibold">Sign-in Email</span>
        <span className="text-base font-semibold">johnsmith@gmail.com</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm lg:text-xl font-semibold">Phone number</span>
        <span className="text-base font-semibold">+380 93 123 45 67</span>
      </div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm lg:text-xl font-semibold">
          Show Online once signed In
        </span>
        <span className="text-base font-semibold">Online</span>
      </div>
      <div className="flex flex-col mb-6">
        <span className="text-base lg:text-xl font-semibold mb-2">
          Last sign in
        </span>
        <span className="text-sm lg:text-base font-semibold ">
          today at 18:34, Safary 198.123.23.23
        </span>
      </div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-base lg:text-xl font-semibold">
            Total active sessions (5)
          </span>
          <span className="text-base font-semibold text-blue2">All</span>
        </div>
        <div className="border-b pb-4 flex flex-col mb-4">
          <span className="text-base font-medium">
            DESKTOP-6TIG6EC • Kyiv, Ukraine
          </span>
          <span className="text-sm font-normal">Chrome • Used right now</span>
        </div>
        <div className="border-b pb-4 flex flex-col">
          <span className="text-base font-medium">
            Iphone 11 • Kyiv, Ukraine
          </span>
          <span className="text-sm font-normal">Chrome • 04/19/2022</span>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="secondary">+ Reset all active sessions</Button>
        </div>
      </div>
    </div>
  );
};

export default PatientAccessAndSecurity;
