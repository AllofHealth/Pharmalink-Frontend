import { AllOfHealthTable } from "@/components/allOfHealthTable/allOfHealth";
import { useGetInstitutions } from "@/lib/queries/institutions";
import { BiLoaderAlt } from "react-icons/bi";

const Practitioners = () => {
  const { institutions, loading, error } = useGetInstitutions();

  const trimText = (text: string, maxLength: number = 10): string => {
    return text?.toString().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  return (
    <div className="">
      <h1 className="font-bold lg:text-3xl mb-6">Practitioners</h1>
      <div className="mb-4 flex gap-6">
        <span className="border border-[#B0B0B0] rounded-lg px-2 py-2 text-center w-[100px] h-10 block">
          Institutions
        </span>
        <span className="border border-[#B0B0B0] bg-[#12778C] text-white rounded-lg px-2 py-2 text-center w-[100px] h-10 block">
          Doctors
        </span>
        <span className="border border-[#B0B0B0] rounded-lg px-2 py-2 text-center w-[100px] h-10 block">
          Pharmacist
        </span>
        <span className="border border-[#B0B0B0] rounded-lg px-2 py-2 text-center w-[100px] h-10 block">
          Patient
        </span>
      </div>
      <AllOfHealthTable
        labels={["Doctor's Name", "City", "Mobile Number", "Wallet Address"]}
        caption="Practitioner's Table"
        headClassName="bg-gray-5 rounded-t-md"
      >
        {loading ? (
          <BiLoaderAlt className="text-xl text-center animate-spin h-20" />
        ) : institutions ? (
          <>
            {institutions?.hospitals.map((institution, index) => (
              <tr className="h-16 text-blue4 font-medium" key={institution.id}>
                <td className="pl-2 lg:pl-7 text-xs lg:text-base">
                  {institution.name}
                </td>
                <td className=" text-xs lg:text-base">
                  {trimText(institution.regNo)}
                </td>
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

export default Practitioners;
