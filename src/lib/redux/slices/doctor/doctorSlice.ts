import type { AllDoctor, Approval, CreateDoctorValues } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DoctorState {
  doctorCurrentTab: string;
  currentDoctor: AllDoctor | null;
  currentPatientRecord: Approval | null;
  doctorSignUpValues: CreateDoctorValues | null;
  currentPatientAddress: string;
}

const initialState: DoctorState = {
  doctorCurrentTab: "CreatePrescription",
  currentDoctor: null,
  currentPatientRecord: null,
  doctorSignUpValues: null,
  currentPatientAddress: "",
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
    setDoctorSignUpValues(state, action: PayloadAction<CreateDoctorValues>) {
      state.doctorSignUpValues = action.payload;
    },
    setCurrentPatientAddress(state, action: PayloadAction<string>) {
      state.currentPatientAddress = action.payload;
    },
  },
});

export const {
  setDoctorCurrentTab,
  setCurrentDoctor,
  setCurrentPatientRecord,
  setDoctorSignUpValues,
  setCurrentPatientAddress,
} = Doctor.actions;
export default Doctor.reducer;
