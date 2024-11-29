import {
  toggleAcceptAdminModal,
  toggleSuccessfullyAddedModal,
} from "@/lib/redux/slices/modals/modalSlice";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";
import { toast } from "sonner";

export const approveInstitution = async ({
  institutionId,
  axios,
  address,
  dispatch,
}: {
  institutionId: string;
  axios: AxiosInstance;
  address: string | undefined;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post(
      `/api/admin/approveHospital?hospitalId=${institutionId}&adminAddress=${address}`
    );
    toast.success(response.data.message);
    dispatch(toggleSuccessfullyAddedModal());
  } catch (err: any) {
    if (err) {
      toast.error("Failed to approve institution: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to approve institution: " + err.message);
    }
  }
};

export const designateRoles = async ({
  practitionerId,
  axios,
  address,
  name,
  email,
  dispatch,
}: {
  practitionerId: number;
  axios: AxiosInstance;
  address: string | undefined;
  name: string;
  email: string;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post(`/api/admin/createAdmin`, {
      id: practitionerId,
      name,
      email,
      walletAddress: address,
    });

    if (response.data) {
      toast.success("Designated role to admin");
      dispatch(toggleAcceptAdminModal());
      console.log(response);
    } else {
      toast.error(
        response.data.message ?? "Failed to designate a role to admin"
      );
      console.error(response);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to designate admin: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to designated admin: " + err.message);
    }
  }
};
