import type { EditMedicineValues, updatePharmacistValues } from "@/lib/types";
import type { AxiosInstance } from "axios";
import { toast } from "sonner";

export const editMedicine = async ({
  editMedicineValues,
  axios,
  address,
  medicineId,
}: {
  editMedicineValues: EditMedicineValues;
  axios: AxiosInstance;
  address: string | undefined;
  medicineId: string;
}) => {
  try {
    const response = await axios.post(
      `/api/pharmacist/updateMedicine?walletAddress=${address}&medicineId=${medicineId}`,
      {
        medicineName: editMedicineValues.medicineName,
      }
    );

    if (response.data) {
      toast.success("Medicine updated successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to update medicine data: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to update medicine data: " + err.message);
    }
  }
};

export const updatePharmacist = async ({
  updatePharmacistValues,
  axios,
  address,
}: {
  updatePharmacistValues: updatePharmacistValues;
  axios: AxiosInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post(
      `/api/pharmacist/updatePharmacist?walletAddress=${address}`,
      {
        name: updatePharmacistValues.name,
      }
    );

    if (response.data) {
      toast.success("Pharmacist data updated successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to update pharmacist data: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to update pharmacist data: " + err.message);
    }
  }
};
