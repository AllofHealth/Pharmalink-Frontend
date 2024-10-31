import type { AxiosInstance } from "axios";
import { toast } from "sonner";

export const addNewMedicationGroup = async ({
  axios,
  category,
}: {
  axios: AxiosInstance;
  category: string;
}) => {
  try {
    const response = await axios.post(
      `/api/medicine/addNewCategory?category=${category}`
    );

    if (response.data) {
      toast.success("Medication Group Added successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to add medication group: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to add medication group: " + err.message);
    }
  }
};
