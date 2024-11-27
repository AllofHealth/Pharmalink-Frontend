"use client";
import { Icon } from "@/components/icon/Icon";
import { useGetPractitionerInstitutions } from "@/lib/queries/institutions";
import { setCurrentInstitution } from "@/lib/redux/slices/institution/institutionSlice";
import type { Institution } from "@/lib/types";
import { useRouter } from "next/navigation";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useAccount } from "wagmi";

export default function SignInInstitution() {
  const { address, isConnected } = useAccount();
  const dispatch = useDispatch();
  const router = useRouter();

  const { practitionerInstitutions, loading, error } =
    useGetPractitionerInstitutions({
      walletAddress: address ? address : "",
      isConnected,
    });

  const handleSignIntoInstitution = (practitionerInstitution: Institution) => {
    dispatch(setCurrentInstitution(practitionerInstitution));
    router.push("/dashboard/institution");
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <Icon name="AllofHealthLogo" />
      </div>
      <p className="text-blue2 font-semibold text-xl text-center">
        Welcome Admin, These are the institutions you are an admin of:
      </p>
      <p className="text-center text-lg mt-5">
        Please select the institution you&apos;ll like to sign in to below:
      </p>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <BiLoaderAlt className="text-2xl text center animate-spin" />
        </div>
      ) : practitionerInstitutions ? (
        <div>
          {practitionerInstitutions.hospital?.map((practitionerInstitution) => {
            return (
              <p
                key={practitionerInstitution.id}
                className="text-center uppercase mt-10 font-bold text-xl border border-gray-1 p-8 w-max mx-auto cursor-pointer"
                onClick={() =>
                  handleSignIntoInstitution(practitionerInstitution)
                }
              >
                {practitionerInstitution.name}
              </p>
            );
          })}
        </div>
      ) : error ? (
        <p>Error fetching practitioner Institutions...</p>
      ) : null}
    </div>
  );
}
