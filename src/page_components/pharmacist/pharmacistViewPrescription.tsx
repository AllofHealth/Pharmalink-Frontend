import Button from "@/components/button/Button";
import useAxios from "@/lib/hooks/useAxios";
import { dispensePrescription } from "@/lib/mutations/pharmacist";
import type { RootState } from "@/lib/redux/rootReducer";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const PharmacistViewPrescription = () => {
  const { axios } = useAxios({});
  const { address } = useAccount();
  const currentPrescription = useSelector(
    (state: RootState) => state.pharmacist.currentPrescription
  );

  const trimText = (text: string, maxLength: number = 10): string => {
    return text?.toString().length > maxLength
      ? `${text.slice(0, maxLength)}...`
      : text;
  };

  return (
    <div>
      <h1 className="font-bold lg:text-3xl mb-6">Prescription List</h1>
      <p className="text-base font-semibold text-gray-7 mb-4">
        Prescription From {currentPrescription?.doctorName}
      </p>
      {currentPrescription?.medicine.map((medicine, index) => {
        return (
          <div key={medicine._id}>
            <h1 className="my-4 font-bold text-2xl">Medicine {index + 1}</h1>
            <article className="border rounded py-4 max-w-[456px] mb-6">
              <h2 className="px-6 text-base font-semibold border-b pb-2">
                Medicine Name: {medicine.productPrescribed}
              </h2>
              <div className="flex justify-between items-center px-6 py-4">
                <span>
                  <h3 className="text-xl font-bold">
                    {trimText(medicine._id)}
                  </h3>
                  <p className="text-sm font-medium">Medicine ID</p>
                </span>
                <span>
                  <h3 className="text-xl font-bold">
                    {medicine.productCategory}
                  </h3>
                  <p className="text-sm font-medium">Medicine Category</p>
                </span>
              </div>
            </article>
            <article className="border rounded py-4 max-w-[944px] mb-6">
              <h2 className="px-6 text-base font-semibold border-b pb-2">
                Description
              </h2>
              <p className="py-4 px-6">{medicine.practitionerNote}</p>
            </article>
            <article className="border rounded py-4 max-w-[944px] mb-6">
              <h2 className="px-6 text-base font-semibold border-b pb-2">
                Dosage
              </h2>
              <p className="py-4 px-6">{medicine.productDosage}</p>
            </article>
          </div>
        );
      })}

      <Button
        variant="secondary"
        className="mx-auto"
        onClick={() =>
          dispensePrescription({
            axios,
            address: address ? address : "",
            prescriptionId: currentPrescription?._id!,
          })
        }
      >
        Dispense prescription
      </Button>
    </div>
  );
};

export default PharmacistViewPrescription;
