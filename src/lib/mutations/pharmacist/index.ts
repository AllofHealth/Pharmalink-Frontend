import type {
  EditMedicineValues,
  NewMedicationFields,
  updatePharmacistValues,
} from "@/lib/types";
import type { AxiosInstance } from "axios";
import { toast } from "sonner";

export const updateMedicineDetails = async ({
  editMedicineValues,
  axios,
  address,
  medicineId,
  productId,
}: {
  editMedicineValues: EditMedicineValues;
  axios: AxiosInstance;
  address: string | undefined;
  medicineId: string;
  productId: string;
}) => {
  try {
    const response = await axios.post(
      `/api/pharmacist/updateMedicine?walletAddress=${address}&medicineId=${medicineId}&productId=${productId}`,
      {
        name: editMedicineValues.name,
        price: editMedicineValues.price,
        medicineGroup: editMedicineValues.medicineGroup,
        quantity: editMedicineValues.quantity,
        description: editMedicineValues.description,
        sideEffects: editMedicineValues.sideEffects,
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

export const dispensePrescription = async ({
  axios,
  address,
  prescriptionId,
}: {
  axios: AxiosInstance;
  address: string | undefined;
  prescriptionId: string;
}) => {
  try {
    const response = await axios.post(
      `/api/pharmacist/dispensePrescription?walletAddress=${address}&prescriptionId=${prescriptionId}`
    );

    if (response.data) {
      toast.success("Prescription dispensed successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to dispense prescription: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to dispense prescription: " + err.message);
    }
  }
};

export const addNewMedication = async ({
  axios,
  address,
  newMedication,
}: {
  axios: AxiosInstance;
  address: string | undefined;
  newMedication: NewMedicationFields;
}) => {
  try {
    const response = await axios.post(
      `/api/pharmacist/addMedicine?walletAddress=${address}`,
      {
        name: newMedication.name,
        price: Number(newMedication.price),
        quantity: Number(newMedication.quantity),
        sideEffects: newMedication.sideEffects,
        category: newMedication.category,
      }
    );

    if (response.data) {
      toast.success("Medication Added successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to add medication: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to add medication: " + err.message);
    }
  }
};
