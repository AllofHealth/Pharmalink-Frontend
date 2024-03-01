import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DoctorState {
  doctorCurrentTab: string;
}

const initialState: DoctorState = {
  doctorCurrentTab: "Overview",
};

const Doctor = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorCurrentTab(state, action: PayloadAction<string>) {
      state.doctorCurrentTab = action.payload;
    },
  },
});

export const { setDoctorCurrentTab } = Doctor.actions;
export default Doctor.reducer;
