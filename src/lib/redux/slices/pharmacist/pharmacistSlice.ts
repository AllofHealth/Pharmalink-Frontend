import type { Medicine, Prescription } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PharmacistState {
  pharmacistCurrentTab: string;
  currentPrescription: Prescription | null;
  currentMedicine: Medicine | null;
}

const initialState: PharmacistState = {
  pharmacistCurrentTab: "Overview",
  currentPrescription: null,
  currentMedicine: null,
};

const Pharmacist = createSlice({
  name: "pharmacist",
  initialState,
  reducers: {
    setPharmacistCurrentTab(state, action: PayloadAction<string>) {
      state.pharmacistCurrentTab = action.payload;
    },
    setCurrentPrescription(state, action: PayloadAction<Prescription>) {
      state.currentPrescription = action.payload;
    },
    setCurrentMedicine(state, action: PayloadAction<Medicine>) {
      state.currentMedicine = action.payload;
    },
  },
});

export const {
  setPharmacistCurrentTab,
  setCurrentPrescription,
  setCurrentMedicine,
} = Pharmacist.actions;
export default Pharmacist.reducer;
