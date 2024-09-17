import { setDoctorSignUpValues } from "@/lib/redux/slices/doctor/doctorSlice";
import {
  setCurrentInstitution,
  setInstitutionSignUpValues,
} from "@/lib/redux/slices/institution/institutionSlice";
import { toggleOtpSuccessModal } from "@/lib/redux/slices/modals/modalSlice";
import { setPatientSignupValues } from "@/lib/redux/slices/patient/patientSlice";
import { setPharmacistSignUpValues } from "@/lib/redux/slices/pharmacist/pharmacistSlice";
import type {
  CreateDoctorValues,
  CreateInstitutionValues,
  CreatePatientValues,
  CreatePharmacistValues,
  CreateSystemAdminValues,
} from "@/lib/types";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const createPatient = async ({
  patientId,
  patientValues,
  axios,
  router,
  address,
  dispatch,
}: {
  patientId: number;
  patientValues: CreatePatientValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post("/api/patient/createNewPatient", {
      id: Number(patientId),
      name: patientValues.name,
      age: Number(patientValues.age),
      email: patientValues.email,
      address: patientValues.address,
      city: patientValues.city,
      phoneNo: patientValues.phoneNo,
      bloodGroup: patientValues.bloodGroup,
      genotype: patientValues.genotype,
      walletAddress: address,
    });

    if (response.data) {
      toast.success("Patient created successfully!. Please sign in.");
      dispatch(setPatientSignupValues(patientValues));
      router.push("/sign-up/patient/otp");
      console.log(response);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to create patient: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to create patient: " + err.message);
    }
  }
};

export const createDoctor = async ({
  doctorId,
  doctorValues,
  axios,
  router,
  address,
  dispatch,
}: {
  doctorId: number;
  doctorValues: CreateDoctorValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post("/api/doctor/createDoctor", {
      id: Number(doctorId),
      hospitalIds: doctorValues.hospitalIds,
      name: doctorValues.name,
      email: doctorValues.email,
      location: doctorValues.location,
      specialty: doctorValues.specialty,
      phoneNumber: doctorValues.phoneNumber,
      walletAddress: address,
    });

    if (response.data) {
      toast.success("Doctor created successfully!. Please sign in.");
      dispatch(setDoctorSignUpValues(doctorValues));
      router.push("/sign-up/doctor/otp");
      console.log(response);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to create doctor: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to create doctor: " + err.message);
    }
  }
};

export const createPharmacist = async ({
  pharmacistId,
  pharmacistValues,
  axios,
  router,
  address,
  dispatch,
}: {
  pharmacistId: number;
  pharmacistValues: CreatePharmacistValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post("/api/pharmacist/createPharmacist", {
      id: Number(pharmacistId),
      hospitalIds: pharmacistValues.hospitalIds,
      name: pharmacistValues.name,
      email: pharmacistValues.email,
      location: pharmacistValues.location,
      phoneNumber: pharmacistValues.phoneNumber,
      walletAddress: address,
    });

    if (response.data) {
      toast.success("Pharmacist created successfully!. Please sign in.");
      dispatch(setPharmacistSignUpValues(pharmacistValues));
      router.push("/sign-up/pharmacist/otp");
      console.log(response);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to create pharmacist: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to create pharmacist: " + err.message);
    }
  }
};

export const createSystemAdmin = async ({
  // systemAdminId,
  systemAdminValues,
  axios,
  router,
  address,
}: {
  // systemAdminId: number;
  systemAdminValues: CreateSystemAdminValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post("/api/admin/createAdmin", {
      // id: Number(systemAdminId),
      name: systemAdminValues.name,
      email: systemAdminValues.email,
      walletAddress: address,
    });

    if (response.data) {
      toast.success("System Admin created successfully!. Please sign in.");
      router.push("/dashboard/system-admin");
      console.log(response);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to create System Admin: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to create System Admin: " + err.message);
    }
  }
};

export const createInstitution = async ({
  institutionId,
  institutionValues,
  axios,
  router,
  address,
  dispatch,
}: {
  institutionId: number;
  institutionValues: CreateInstitutionValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post("/api/hospital/createHospital", {
      id: Number(institutionId),
      name: institutionValues.name,
      email: institutionValues.email,
      admin: address,
      phoneNo: institutionValues.phoneNo,
      location: institutionValues.location,
      description: institutionValues.description,
      type: institutionValues.type,
      regNo: institutionValues.regNo,
    });

    if (response.data) {
      toast.success("Institution created successfully!. Please sign in.");
      router.push("/sign-up/institution/otp");
      dispatch(setCurrentInstitution(response.data.hospital));
      dispatch(setInstitutionSignUpValues(institutionValues));
      console.log(response);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to create Institution: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to create Institution: " + err.message);
    }
  }
};

export const sendOTP = async ({
  axios,
  address,
}: {
  axios: AxiosInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post(
      `/api/otp/resendOTP?walletAddress=${address}`
    );

    if (response.data) {
      toast.success("OTP sent!");
      console.log(response);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to send otp: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to send otp: " + err.message);
    }
  }
};

export const verifyOTP = async ({
  axios,
  address,
  otp,
  dispatch,
  role,
}: {
  axios: AxiosInstance;
  address: string | undefined;
  otp: string;
  dispatch: Dispatch<UnknownAction>;
  role: string;
}) => {
  try {
    const response = await axios.post(
      `/api/otp/verify?walletAddress=${address}&otp=${otp}&role=${role}`
    );

    if (response.data.success === 200) {
      toast.success(`${response.data.message}`);
      dispatch(toggleOtpSuccessModal());
    } else {
      toast.error(`${response.data.message}`);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to verify otp: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to verify otp: " + err.message);
    }
  }
};
