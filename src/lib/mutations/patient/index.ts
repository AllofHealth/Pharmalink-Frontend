import { toggleAccessGrantedSharePrescriptionModal } from "@/lib/redux/slices/modals/modalSlice";
import type {
  CreateFamilyMemberValues,
  UpdatePatientValues,
} from "@/lib/types";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const createFamilyMember = async ({
  familyMemberId,
  familyMemberValues,
  axios,
  router,
  address,
}: {
  familyMemberId: number;
  familyMemberValues: CreateFamilyMemberValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post(
      `/api/patient/createFamilyMember?walletAddress=${address}`,
      {
        id: Number(familyMemberId),
        name: familyMemberValues.name,
        relationship: familyMemberValues.relationship,
        age: Number(familyMemberValues.age),
        email: familyMemberValues.email,
        address: familyMemberValues.address,
        dob: familyMemberValues.dob,
        bloodGroup: familyMemberValues.bloodGroup,
        genotype: familyMemberValues.genotype,
      }
    );

    if (response.data) {
      toast.success("Family Member created successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to create family member: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to create family member: " + err.message);
    }
  }
};

export const updatePatient = async ({
  updatePatientValues,
  axios,
  address,
}: {
  updatePatientValues: UpdatePatientValues;
  axios: AxiosInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post(
      `/api/patient/updatePatient?walletAddress=${address}`,
      {
        name: updatePatientValues.name,
      }
    );

    if (response.data) {
      toast.success("Patient data updated successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to update patient data: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to update patient data: " + err.message);
    }
  }
};

export const sharePrescription = async ({
  axios,
  patientAddress,
  pharmacistAddress,
  prescriptionId,
  dispatch,
}: {
  axios: AxiosInstance;
  patientAddress: string | undefined;
  pharmacistAddress: string | undefined;
  prescriptionId: string;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post(
      `/api/patient/sharePrescription?walletAddress=${patientAddress}&pharmacistAddress=${pharmacistAddress}`,
      {
        prescriptionId,
      }
    );

    if (response.data) {
      toast.success("Shared prescription successfully!.");
      dispatch(toggleAccessGrantedSharePrescriptionModal());
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to share prescription: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to share prescription: " + err.message);
    }
  }
};
