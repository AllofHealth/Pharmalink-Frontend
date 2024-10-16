import {
  setCurrentPatientRecord,
  setDoctorCurrentTab,
} from "@/lib/redux/slices/doctor/doctorSlice";
import { toggleSuccessfullyEditedMedicalRecordModal } from "@/lib/redux/slices/modals/modalSlice";
import type {
  Approval,
  CreateMedicalRecordValues,
  Medicine,
  UpdateDoctorValues,
} from "@/lib/types";
import type { PrescriptionMedicine } from "@/page_components/doctor/createPrescription";
import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import type { AxiosInstance } from "axios";
import { toast } from "sonner";

export const approveRecordRequest = async ({
  axios,
  patientAddress,
  doctorAddress,
  recordId,
  dispatch,
  record,
}: {
  axios: AxiosInstance;
  recordId: string;
  patientAddress: string;
  doctorAddress: string;
  dispatch: Dispatch<UnknownAction>;
  record: Approval;
}) => {
  try {
    const response = await axios.post(
      `/api/doctor/approveRecordAccessRequest?patientAddress=${patientAddress}&doctorAddress=${doctorAddress}&recordId=${recordId}`
    );

    if (response.data) {
      toast.success("Approved patient record request successfully!.");
      dispatch(setDoctorCurrentTab("Patient Medical Record"));
      dispatch(setCurrentPatientRecord(record));
    }
  } catch (err: any) {
    if (err) {
      toast.error(
        "Failed to send approve patient record request: " + err.message
      );
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error(
        "Failed to send approve patient record request: " + err.message
      );
    }
  }
};

export const createMedicalRecord = async ({
  axios,
  patientAddress,
  doctorAddress,
  recordId,
  medicalRecordValues,
  dispatch,
}: {
  axios: AxiosInstance;
  recordId: number;
  medicalRecordValues: CreateMedicalRecordValues;
  patientAddress: string;
  doctorAddress: string;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post(
      `/api/doctor/createMedicalRecord?patientAddress=${patientAddress}&doctorAddress=${doctorAddress}`,
      {
        recordId: Number(recordId),
        diagnosis: medicalRecordValues.diagnosis,
      }
    );

    if (response.data) {
      toast.success("Created medical record successfully!.");
      dispatch(toggleSuccessfullyEditedMedicalRecordModal());
      dispatch(setDoctorCurrentTab("CreatePrescription"));
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to create medical record: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to create medical record: " + err.message);
    }
  }
};

export const updateDoctor = async ({
  updateDoctorValues,
  axios,
  address,
}: {
  updateDoctorValues: UpdateDoctorValues;
  axios: AxiosInstance;
  address: string | undefined;
}) => {
  try {
    const response = await axios.post(
      `/api/doctor/updateDoctor?walletAddress=${address}`,
      {
        name: updateDoctorValues.name,
      }
    );

    if (response.data) {
      toast.success("Doctor data updated successfully!.");
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to update doctor data: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to update doctor data: " + err.message);
    }
  }
};

export const addMedicinePrescription = async ({
  prescription,
  axios,
  patientAddress,
  doctorAddress,
  recordId,
  dispatch,
}: {
  prescription: PrescriptionMedicine[];
  axios: AxiosInstance;
  patientAddress: string | undefined;
  doctorAddress: string | undefined;
  recordId: number;
  dispatch: Dispatch<UnknownAction>;
}) => {
  try {
    const response = await axios.post(
      `/api/doctor/addPatientPrescription?patientAddress=${patientAddress}&doctorAddress=${doctorAddress}`,
      {
        recordId,
        medicine: prescription,
      }
    );
    console.log(response.data.success);

    if (response.data.success === (200 || 201)) {
      toast.success("Prescription added successfully!.");
      dispatch(setDoctorCurrentTab("Overview"));
    } else {
      toast.error(response.data.message);
    }
  } catch (err: any) {
    if (err) {
      toast.error("Failed to add prescription: " + err.message);
      console.error(err);
    } else {
      console.error("An unknown error occurred:", err);
      toast.error("Failed to add prescription: " + err.message);
    }
  }
};
