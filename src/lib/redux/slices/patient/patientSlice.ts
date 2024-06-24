import type { Prescription } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PatientState {
  patientCurrentTab: string;
  currentPrescription: Prescription | null;
  approvalType: string;
  approveRequestFamilyMemberMedicalRecord: number;
}

const initialState: PatientState = {
  patientCurrentTab: "Overview",
  currentPrescription: null,
  approvalType: "",
  approveRequestFamilyMemberMedicalRecord: 0,
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
  },
});

export const {
  setPatientCurrentTab,
  setCurrentPrescription,
  setApprovalType,
  setApproveRequestFamilyMemberMedicalRecord,
} = Patient.actions;
export default Patient.reducer;
