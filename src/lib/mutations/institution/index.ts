import { setCurrentInstitution } from "@/lib/redux/slices/institution/institutionSlice";
import { toggleInstitutionSuccessfullyAddedModal } from "@/lib/redux/slices/modals/modalSlice";
import type { UpdateInstitutionValues } from "@/lib/types";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";
import { toast } from "sonner";

export const approvePractitionerToInstitution = async ({
  axios,
  practitionerAddress,
  adminAddress,
  hospitalId,
  dispatch,
}: {
  axios: AxiosInstance;
  hospitalId: string;
  adminAddress: string | undefined;
  practitionerAddress: string;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post(
      `/api/hospital/approvePractitioner?hospitalId=${hospitalId}&adminAddress=${adminAddress}&practitionerAddress=${practitionerAddress}`
    );

    if (response.data) {
      toast.success("Approved practitioner successfully!.");
      dispatch(toggleInstitutionSuccessfullyAddedModal());
    }
  } catch (err: any) {
    if (err) {
      toast.error(
        "Failed to send approve practitioner to institution: " + err.message
      );
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error(
        "Failed to send approve practitioner to institution: " + err.message
      );
    }
  }
};

export const updateInstitution = async ({
  updateInstitutionValues,
  axios,
  hospitalId,
  adminAddress,
  dispatch,
}: {
  updateInstitutionValues: UpdateInstitutionValues;
  axios: AxiosInstance;
  hospitalId: string;
  adminAddress: string;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post(
      `/api/hospital/updateHospital?hospitalId=${hospitalId}&adminAddress=${adminAddress}`,
      {
        name: updateInstitutionValues.name,
        location: updateInstitutionValues.location,
      }
    );

    if (response.data.success === 200) {
      toast.success("Institution data updated successfully!.");
      dispatch(setCurrentInstitution(response.data.updatedHospital));
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to update Institution data: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to update Institution data: " + err.message);
    }
  }
};
