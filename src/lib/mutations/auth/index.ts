import useAxios from "@/lib/hooks/useAxios";
import type { CreatePatientValues } from "@/lib/types";
import type { AxiosError, AxiosInstance } from "axios";

export const createPatient = async ({
  patientId,
  patientValues,
  axios,
}: {
  patientId: number;
  patientValues: CreatePatientValues;
  axios: AxiosInstance;
}): Promise<{ data: any | null; error: any }> => {
  let data = null;
  let error = null;

  try {
    const response = await axios.post("/api/patient/createNewPatient", {
      id: Number(patientId),
      name: patientValues.name,
      age: Number(patientValues.age),
      email: patientValues.email,
      address: patientValues.address,
      city: patientValues.city,
      walletAddress: patientValues.walletAddress,
      bloodGroup: patientValues.bloodGroup,
      genotype: patientValues.genotype,
    });

    data = response.data;
  } catch (err) {
    if (err) {
      error = err;
    } else {
      console.error("An unknown error occurred:", err);
    }
  }

  return { data, error };
};
