import { Icon } from "@/components/icon/Icon";
import { useGetDoctorByAddress } from "@/lib/queries/auth";
import { useGetDoctorApprovalList } from "@/lib/queries/doctor";
import type { GetDoctorMessage } from "@/lib/types";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import { useAccount } from "wagmi";

const DoctorOverview = () => {
  const { isConnected, address } = useAccount();

  const {
    loading: loadingDoctorData,
    doctorData,
    error: errorDoctorData,
  } = useGetDoctorByAddress({
    connected: isConnected,
    address: address ? address : "",
  });

  const { loading, doctorApprovalList, error } = useGetDoctorApprovalList({
    address: address ? address : "",
    isConnected,
  });

  return (
    <>
      {loadingDoctorData ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : doctorData ? (
        <section>
          <div className="my-4">
            <span className="text-base font-bold lg:text-3xl lg:font-extrabold">
              Welcome, Dr. {(doctorData as GetDoctorMessage)?.doctor?.name}
            </span>
            <p className="text-xs lg:text-base text-gray-7 my-2">
              Have a nice day at work today, Doc!
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#00758A] via-[#47CDD4] to-[#017489] flex justify-between rounded-2xl pl-4 mb-4 lg:pl-20">
            <div className="py-4 pr-2 h-max lg:pt-10">
              <div className="flex items-center gap-4 mb-4 lg:mb-8">
                <Icon name="Asset" />
                {/* <div>
                  <span className="text-base font-medium lg:text-2xl text-white">
                    Total assets
                  </span>
                  <p className="text-2xl lg:text-[40px] font-bold text-white">
                    $ 87.743
                  </p>
                </div> */}
              </div>
              <div className="lg:flex lg:gap-4 ">
                <div className="bg-blue5 px-4 py-2 lg:py-4 rounded-2xl mb-4 lg:mb-0">
                  <p className="text-sm lg:text-[18px] font-semibold mb-4 flex gap-2">
                    <Icon name="Home" />
                    Institution
                  </p>
                  <span className="text-[20px] lg:text-4xl">
                    {(doctorData as GetDoctorMessage)?.doctor.hospitalIds}{" "}
                    Hospital
                  </span>
                </div>
                <div className="bg-blue5 px-4 py-2 lg:py-4 rounded-2xl mb-4 lg:mb-0">
                  <p className="text-sm lg:text-[18px] mb-4 flex gap-2 font-semibold">
                    <Icon name="RegistrationStatus" />
                    Registration Status
                  </p>
                  <span className="text-[20px] lg:text-4xl">
                    {(doctorData as GetDoctorMessage)?.doctor.status}
                  </span>
                </div>
              </div>
            </div>
            <Image
              src="/assets/images/emergency.png"
              alt="A Doctor"
              width={391}
              height={328}
              className="rounded-tr-2xl rounded-br-2xl w-2/5 object-fill object-center"
            />
          </div>
          {/* RECENT APPROVALS */}
          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <BiLoaderAlt className="text-2xl text center animate-spin" />
            </div>
          ) : (doctorData as GetDoctorMessage)?.doctor.status === "approved" ? (
            <div>
              <span className="flex justify-between mb-6">
                <h3 className="text-[18px] lg:text-xl font-bold">
                  Recent Approvals
                </h3>
                <p className="text-sm lg:text-base border border-[#6F767E] text-gray-8 px-2 py-1 rounded-lg">
                  All Approvals &gt;
                </p>
              </span>
              {doctorApprovalList?.approvals?.map((approval) => {
                return (
                  <div
                    className="flex gap-4 items-center mb-4"
                    key={approval._id}
                  >
                    <Image
                      src={approval.profilePicture}
                      alt="Patient Approval"
                      width={32}
                      height={32}
                      className="lg:w-16 lg:h-16"
                    />
                    <div>
                      <h4 className="text-sm lg:text-lg font-medium">
                        {approval.patientName}
                      </h4>
                      <p className="text-[10px] lg:text-base font-normal">
                        {approval.approvalStatus}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (doctorData as GetDoctorMessage)?.doctor.status !== "approved" ? (
            <div className="lg:flex justify-between items-center max-w-[80%] mx-auto">
              <div className="max-w-[513px]">
                <p className="text-base lg:text-3xl font-semibold text-blue2">
                  Doctor Not Yet Verified
                </p>
                <p className="text-sm lg:text-xl font-normal text-[#1E1E1E]">
                  This doctor is currently not verified and cannot perform any
                  doctor roles. Kindly wait to be verified by an
                  institution/hospital.
                </p>
              </div>
              <Image
                src={"/assets/images/no-data-found.png"}
                alt="No data for institutions"
                width={396}
                height={344}
              />
            </div>
          ) : error ? (
            <p>Error fetching approval List...</p>
          ) : null}

          {/* RECENT MESSAGES */}
          {/* <div>
          <span className="flex justify-between mb-6">
            <h3 className="text-[18px] lg:text-xl font-bold">Recent Messages</h3>
            <p className="text-sm lg:text-base border border-[#6F767E] text-gray-8 px-2 py-1 rounded-lg">
              All Messages &gt;
            </p>
          </span>
          <div className="flex gap-2 items-center mb-4">
            <Image
              src="/assets/images/avatar.png"
              alt="Memoji"
              width={32}
              height={32}
              className="lg:w-16 lg:h-16"
            />
            <div className="flex gap-2 items-center">
              <h4 className="text-xs lg:text-lg font-medium flex-1">
                Medical emergency
              </h4>
              <span className="text-xs">
                - Doctor, i have tried the drugs and they
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-4">
            <Image
              src="/assets/images/avatar.png"
              alt="Memoji"
              width={32}
              height={32}
              className="lg:w-16 lg:h-16"
            />
            <div className="flex gap-2 items-center">
              <h4 className="text-xs lg:text-lg font-medium flex-1">
                Medical emergency
              </h4>
              <span className="text-xs">
                - Doctor, i have tried the drugs and they
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-4">
            <Image
              src="/assets/images/avatar.png"
              alt="Memoji"
              width={32}
              height={32}
              className="lg:w-16 lg:h-16"
            />
            <div className="flex gap-2 items-center">
              <h4 className="text-xs lg:text-lg font-medium flex-1">
                Medical emergency
              </h4>
              <span className="text-xs">
                - Doctor, i have tried the drugs and they
              </span>
            </div>
          </div>
        </div> */}
        </section>
      ) : errorDoctorData ? (
        <p>Error fetching doctor data...</p>
      ) : null}
    </>
  );
};

export default DoctorOverview;
