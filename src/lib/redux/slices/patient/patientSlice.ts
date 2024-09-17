import type { CreatePatientValues, Prescription } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PatientState {
  patientCurrentTab: string;
  currentPrescription: Prescription | null;
  approvalType: string;
  approveRequestFamilyMemberMedicalRecord: number;
  patientSignupValues: CreatePatientValues | null;
}

const initialState: PatientState = {
  patientCurrentTab: "Overview",
  currentPrescription: null,
  approvalType: "",
  approveRequestFamilyMemberMedicalRecord: 0,
  patientSignupValues: null,
};

const Patient = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientCurrentTab(state, action: PayloadAction<string>) {
      state.patientCurrentTab = action.payload;
    },
    setCurrentPrescription(state, action: PayloadAction<Prescription>) {
      state.currentPrescription = action.payload;
    },
    setApprovalType(state, action: PayloadAction<string>) {
      state.approvalType = action.payload;
    },
    setApproveRequestFamilyMemberMedicalRecord(
      state,
      action: PayloadAction<number>
    ) {
      state.approveRequestFamilyMemberMedicalRecord = action.payload;
      console.log(action.payload);
    },
    setPatientSignupValues(state, action: PayloadAction<CreatePatientValues>) {
      state.patientSignupValues = action.payload;
    },
  },
});

export const {
  setPatientCurrentTab,
  setCurrentPrescription,
  setApprovalType,
  setApproveRequestFamilyMemberMedicalRecord,
  setPatientSignupValues,
} = Patient.actions;
export default Patient.reducer;
