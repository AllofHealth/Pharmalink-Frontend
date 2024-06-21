import type { Prescription } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PatientState {
  patientCurrentTab: string;
  currentPrescription: Prescription | null;
  approvalType: string;
}

const initialState: PatientState = {
  patientCurrentTab: "Overview",
  currentPrescription: null,
  approvalType: "",
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
  },
});

export const { setPatientCurrentTab, setCurrentPrescription, setApprovalType } =
  Patient.actions;
export default Patient.reducer;
