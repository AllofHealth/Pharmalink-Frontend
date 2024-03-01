import Button from "@/components/button/Button";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

const FamilyRegistration = () => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-[1020px]">
      <div className="flex justify-between mb-4 max-w-[900px]">
        <h1 className="font-bold lg:text-3xl">Family Registered</h1>
        <Button
          variant="secondary"
          className="h-[29px] px-2 text-[10px] lg:h-auto lg:text-xl lg:px-5"
          onClick={() =>
            dispatch(setPatientCurrentTab("Family Registration Form"))
          }
        >
          + Add New Family Member
        </Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
          <Image
            src="/assets/images/patient_img.jpg"
            alt="Face card"
            width={94}
            height={94}
            className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
          />
          <div>
            <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
              Jay Vaughn
            </h3>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Role: </span>
              <span className="font-normal">Patient</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Email: </span>
              <span className="font-normal">jayvaughn@gmail.com</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">+23478219876 </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Address: </span>
              <span className="font-normal">100, cross street, Calabar.</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Age: </span>
              <span className="font-normal">35</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Date of birth: </span>
              <span className="font-normal">12/09/1800</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Blood Group:</span>
              <span className="font-normal">O+ </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Genotype: </span>
              <span className="font-normal">AA </span>
            </div>
          </div>
        </article>
        <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
          <Image
            src="/assets/images/patient_img.jpg"
            alt="Face card"
            width={94}
            height={94}
            className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
          />
          <div>
            <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
              Jay Vaughn
            </h3>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Role: </span>
              <span className="font-normal">Patient</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Email: </span>
              <span className="font-normal">jayvaughn@gmail.com</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">+23478219876 </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Address: </span>
              <span className="font-normal">100, cross street, Calabar.</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Age: </span>
              <span className="font-normal">35</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Date of birth: </span>
              <span className="font-normal">12/09/1800</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Blood Group:</span>
              <span className="font-normal">O+ </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Genotype: </span>
              <span className="font-normal">AA </span>
            </div>
          </div>
        </article>
        <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
          <Image
            src="/assets/images/patient_img.jpg"
            alt="Face card"
            width={94}
            height={94}
            className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
          />
          <div>
            <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
              Jay Vaughn
            </h3>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Role: </span>
              <span className="font-normal">Patient</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Email: </span>
              <span className="font-normal">jayvaughn@gmail.com</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">+23478219876 </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Address: </span>
              <span className="font-normal">100, cross street, Calabar.</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Age: </span>
              <span className="font-normal">35</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Date of birth: </span>
              <span className="font-normal">12/09/1800</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Blood Group:</span>
              <span className="font-normal">O+ </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Genotype: </span>
              <span className="font-normal">AA </span>
            </div>
          </div>
        </article>
        <article className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]">
          <Image
            src="/assets/images/patient_img.jpg"
            alt="Face card"
            width={94}
            height={94}
            className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
          />
          <div>
            <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
              Jay Vaughn
            </h3>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Role: </span>
              <span className="font-normal">Patient</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Email: </span>
              <span className="font-normal">jayvaughn@gmail.com</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Phone Number: </span>
              <span className="font-normal">+23478219876 </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Address: </span>
              <span className="font-normal">100, cross street, Calabar.</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Age: </span>
              <span className="font-normal">35</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Date of birth: </span>
              <span className="font-normal">12/09/1800</span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Blood Group:</span>
              <span className="font-normal">O+ </span>
            </div>
            <div className="flex gap-2 itmes-center mb-2">
              <span className="font-bold">Genotype: </span>
              <span className="font-normal">AA </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FamilyRegistration;
