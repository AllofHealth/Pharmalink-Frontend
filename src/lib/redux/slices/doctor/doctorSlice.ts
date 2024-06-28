import type { AllDoctor, Approval } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DoctorState {
  doctorCurrentTab: string;
  currentDoctor: AllDoctor | null;
  currentPatientRecord: Approval | null;
}

const initialState: DoctorState = {
  doctorCurrentTab: "Overview",
  currentDoctor: null,
  currentPatientRecord: null,
};

const Doctor = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorCurrentTab(state, action: PayloadAction<string>) {
      state.doctorCurrentTab = action.payload;
    },
    setCurrentDoctor(state, action: PayloadAction<AllDoctor>) {
      state.currentDoctor = action.payload;
    },
    setCurrentPatientRecord(state, action: PayloadAction<Approval>) {
      state.currentPatientRecord = action.payload;
    },
  },
});

export const {
  setDoctorCurrentTab,
  setCurrentDoctor,
  setCurrentPatientRecord,
} = Doctor.actions;
export default Doctor.reducer;
