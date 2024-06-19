import type { AllDoctor } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DoctorState {
  doctorCurrentTab: string;
  currentDoctor: AllDoctor | null;
}

const initialState: DoctorState = {
  doctorCurrentTab: "Overview",
  currentDoctor: null,
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
  },
});

export const { setDoctorCurrentTab, setCurrentDoctor } = Doctor.actions;
export default Doctor.reducer;
