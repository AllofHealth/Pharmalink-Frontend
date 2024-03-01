import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PatientState {
  patientCurrentTab: string;
}

const initialState: PatientState = {
  patientCurrentTab: "Overview",
};

const Patient = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientCurrentTab(state, action: PayloadAction<string>) {
      state.patientCurrentTab = action.payload;
    },
  },
});

export const { setPatientCurrentTab } = Patient.actions;
export default Patient.reducer;
