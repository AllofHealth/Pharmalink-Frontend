import Button from "@/components/button/Button";
import { useGetAllPatientFamilyMembers } from "@/lib/queries/patient";
import { setPatientCurrentTab } from "@/lib/redux/slices/patient/patientSlice";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

const FamilyRegistration = () => {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { familyMembers, loading, error } = useGetAllPatientFamilyMembers({
    walletAddress: address ? address : "",
  });
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
        {loading ? (
          <BiLoaderAlt className="text-2xl text-center mx-auto" />
        ) : familyMembers?.members.length !== 0 ? (
          <>
            {familyMembers?.members?.map((familyMember) => {
              return (
                <article
                  key={familyMember.id}
                  className="flex flex-col lg:flex-row gap-4 px-4 py-6 items-center bg-white shadow-md rounded-3xl mb-8 max-w-[430px]"
                >
                  <Image
                    src="/assets/images/patient_img.jpg"
                    alt="Family member"
                    width={94}
                    height={94}
                    className="rounded-[50%] w-[94px] h-[94px] object-center object-cover"
                  />
                  <div>
                    <h3 className="text-2xl lg:text-[32px] mb-4 font-semibold">
                      {familyMember.name}
                    </h3>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Role: </span>
                      <span className="font-normal">
                        {" "}
                        {familyMember.relationship}
                      </span>
                    </div>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Email: </span>
                      <span className="font-normal">{familyMember.email}</span>
                    </div>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Phone Number: </span>
                      <span className="font-normal">+23478219876 </span>
                    </div>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Address: </span>
                      <span className="font-normal">
                        {familyMember.address}
                      </span>
                    </div>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Age: </span>
                      <span className="font-normal">{familyMember.age}</span>
                    </div>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Date of birth: </span>
                      <span className="font-normal">
                        {formatDate(familyMember.dob)}
                      </span>
                    </div>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Blood Group:</span>
                      <span className="font-normal">
                        {familyMember.bloodGroup}{" "}
                      </span>
                    </div>
                    <div className="flex gap-2 itmes-center mb-2">
                      <span className="font-bold">Genotype: </span>
                      <span className="font-normal">
                        {familyMember.genotype}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </>
        ) : familyMembers?.members.length === 0 ? (
          <div className="mt-12">
            <p className="text-center font-bold text-3xl">No members found</p>
          </div>
        ) : error ? (
          <p>Error fetching family members data...</p>
        ) : null}
      </div>
    </div>
  );
};

export default FamilyRegistration;
