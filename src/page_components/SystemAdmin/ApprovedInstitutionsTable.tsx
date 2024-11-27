import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import {
  useGetApprovedInstitutions,
  useGetInstitutions,
} from "@/lib/queries/institutions";
import { BiLoaderAlt } from "react-icons/bi";

const ApprovedInstitutions = () => {
  const { institutions, loading, error } = useGetApprovedInstitutions();

  const trimText = (text: string, maxLength: number = 10): string => {
    return text?.toString().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  return (
    <div className="w-full">
      <h1 className="font-bold lg:text-3xl mb-6">Approved Institutions</h1>
      <AllOfHealthTable
        labels={[
          "Institution Name",
          "Registration no.",
          "Wallet Address",
          "Phone Number",
        ]}
        caption="Approve Institution Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {loading ? (
          <BiLoaderAlt className="text-xl text-center animate-spin h-20" />
        ) : institutions ? (
          <>
            {institutions?.hospital.map((institution, index) => (
              <tr className="h-16 text-blue4 font-medium" key={institution.id}>
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {institution.name}
                </td>
                <td className=" text-xs lg:text-base">{institution.regNo}</td>
                <td className=" text-xs lg:text-base">
                  {trimText(institution.admin)}
                </td>
                <td className=" text-xs lg:text-base">{institution.phoneNo}</td>
              </tr>
            ))}
          </>
        ) : (
          <p>Error fetching data....</p>
        )}
      </AllOfHealthTable>
    </div>
  );
};

export default ApprovedInstitutions;
