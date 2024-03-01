import { Icon } from "@/components/icon/Icon";
import Image from "next/image";

const PatientOverview = () => {
  return (
    <section>
      <div className="my-4">
        <span className="text-base font-bold lg:text-3xl lg:font-extrabold">
          Welcome, Mr. Adewole.
        </span>
        <p className="text-xs lg:text-base text-gray-7 my-2">
          Have a nice day at work today, sir!
        </p>
      </div>
      <div className="bg-gradient-to-r from-[#00758A] via-[#47CDD4] to-[#017489] flex justify-between rounded-2xl pl-4 mb-4 lg:pl-20">
        <div className="py-4 pr-2 h-max lg:pt-10">
          <div className="flex items-center gap-4 mb-4 lg:mb-8">
            <Icon name="Asset" />
            <div>
              <span className="text-base font-medium lg:text-2xl text-white">
                Total assets
              </span>
              <p className="text-2xl lg:text-[40px] font-bold text-white">
                $ 87.743
              </p>
            </div>
          </div>
          <div className="lg:flex lg:gap-4 ">
            <div className="bg-blue5 px-4 py-2 lg:py-4 rounded-2xl mb-4 lg:mb-0">
              <p className="text-sm lg:text-[18px] font-semibold mb-4 flex gap-2">
                <Icon name="FindDoctor" />
                Appointments
              </p>
              <span className="text-[20px] lg:text-4xl">1250</span>
            </div>
            <div className="bg-blue5 px-4 py-2 lg:py-4 rounded-2xl mb-4 lg:mb-0">
              <p className="text-sm lg:text-[18px] mb-4 flex gap-2 font-semibold">
                <Icon name="Prescription" />
                Prescriptions
              </p>
              <span className="text-[20px] lg:text-4xl">50</span>
            </div>
          </div>
        </div>
        <Image
          src="/assets/images/patient-dashboard-img.png"
          alt="A Doctor"
          width={391}
          height={328}
          className="rounded-tr-2xl rounded-br-2xl w-2/5 object-fill object-center"
        />
      </div>
      {/* Doctors Online */}
      <div>
        <span className="flex justify-between mb-6 max-w-[600px]">
          <h3 className="text-[18px] lg:text-xl font-bold">Doctors Online</h3>
          <p className="text-sm lg:text-base border border-[#6F767E] text-gray-8 px-2 py-1 rounded-lg">
            View All &gt;
          </p>
        </span>
        <div className="grid gap-y-6 lg:grid-cols-2 max-w-[640px]">
          <article className="flex gap-4 border max-w-[300px] p-1 rounded-[10px]">
            <Image
              src="/assets/images/patient-dashboard-img.png"
              alt="A Doctor"
              width={96}
              height={96}
              className="rounded-[10px] "
            />
            <div>
              <h3 className="text-base font-semibold">Dr. Nallarasi</h3>
              <p className="text-xs text-gray-8 font-semibold">Orthopaedic</p>
              <span className="flex items-center gap-4 p-1 text-[#407CE2]">
                <Icon name="StarBlue" />
                4.7
              </span>
            </div>
          </article>
          <article className="flex gap-4 border max-w-[300px] p-1 rounded-[10px]">
            <Image
              src="/assets/images/patient-dashboard-img.png"
              alt="A Doctor"
              width={96}
              height={96}
              className="rounded-[10px] "
            />
            <div>
              <h3 className="text-base font-semibold">Dr. Nallarasi</h3>
              <p className="text-xs text-gray-8 font-semibold">Orthopaedic</p>
              <span className="flex items-center gap-4 p-1 text-[#407CE2]">
                <Icon name="StarBlue" />
                4.7
              </span>
            </div>
          </article>
          <article className="flex gap-4 border max-w-[300px] p-1 rounded-[10px]">
            <Image
              src="/assets/images/patient-dashboard-img.png"
              alt="A Doctor"
              width={96}
              height={96}
              className="rounded-[10px] "
            />
            <div>
              <h3 className="text-base font-semibold">Dr. Nallarasi</h3>
              <p className="text-xs text-gray-8 font-semibold">Orthopaedic</p>
              <span className="flex items-center gap-4 p-1 text-[#407CE2]">
                <Icon name="StarBlue" />
                4.7
              </span>
            </div>
          </article>
          <article className="flex gap-4 border max-w-[300px] p-1 rounded-[10px]">
            <Image
              src="/assets/images/patient-dashboard-img.png"
              alt="A Doctor"
              width={96}
              height={96}
              className="rounded-[10px] "
            />
            <div>
              <h3 className="text-base font-semibold">Dr. Nallarasi</h3>
              <p className="text-xs text-gray-8 font-semibold">Orthopaedic</p>
              <span className="flex items-center gap-4 p-1 text-[#407CE2]">
                <Icon name="StarBlue" />
                4.7
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PatientOverview;
