import type { Prescription } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PatientState {
  patientCurrentTab: string;
  currentPrescription: Prescription | null;
}

const initialState: PatientState = {
  patientCurrentTab: "Overview",
  currentPrescription: null,
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
  },
});

export const { setPatientCurrentTab, setCurrentPrescription } = Patient.actions;
export default Patient.reducer;
