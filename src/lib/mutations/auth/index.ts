import { setCurrentInstitution } from "@/lib/redux/slices/institution/institutionSlice";
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
}: {
  patientId: number;
  patientValues: CreatePatientValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post("/api/patient/createNewPatient", {
      id: Number(patientId),
      name: patientValues.name,
      age: Number(patientValues.age),
      email: patientValues.email,
      address: patientValues.address,
      city: patientValues.city,
      walletAddress: address,
      bloodGroup: patientValues.bloodGroup,
      genotype: patientValues.genotype,
    });

    if (response.data) {
      toast.success("Patient created successfully!. Please sign in.");
      router.push("/dashboard/patient");
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
}: {
  doctorId: number;
  doctorValues: CreateDoctorValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
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
      router.push("/dashboard/doctor");
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
}: {
  pharmacistId: number;
  pharmacistValues: CreatePharmacistValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
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
      router.push("/dashboard/pharmacist");
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
  systemAdminId,
  systemAdminValues,
  axios,
  router,
  address,
}: {
  systemAdminId: number;
  systemAdminValues: CreateSystemAdminValues;
  axios: AxiosInstance;
  router: AppRouterInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post("/api/admin/createAdmin", {
      id: Number(systemAdminId),
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
    });

    if (response.data) {
      toast.success("Institution created successfully!. Please sign in.");
      router.push("/dashboard/institution");
      dispatch(setCurrentInstitution(response.data.hospital));
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
