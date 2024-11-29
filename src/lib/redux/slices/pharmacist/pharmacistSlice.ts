import type {
  CreatePharmacistValues,
  Prescription,
  Product,
} from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PharmacistState {
  pharmacistCurrentTab: string;
  currentPrescription: Prescription | null;
  currentMedicine: Product | null;
  currentMedicineIndex: number;
  pharmacistSignUpValues: CreatePharmacistValues | null;
}

const initialState: PharmacistState = {
  pharmacistCurrentTab: "Overview",
  currentPrescription: null,
  currentMedicine: null,
  currentMedicineIndex: 0,
  pharmacistSignUpValues: null,
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
    setCurrentMedicine(state, action: PayloadAction<Product>) {
      state.currentMedicine = action.payload;
    },
    setCurrentMedicineIndex(state, action: PayloadAction<number>) {
      state.currentMedicineIndex = action.payload;
    },
    setPharmacistSignUpValues(
      state,
      action: PayloadAction<CreatePharmacistValues>
    ) {
      state.pharmacistSignUpValues = action.payload;
    },
  },
});

export const {
  setPharmacistCurrentTab,
  setCurrentPrescription,
  setCurrentMedicine,
  setCurrentMedicineIndex,
  setPharmacistSignUpValues,
} = Pharmacist.actions;
export default Pharmacist.reducer;
