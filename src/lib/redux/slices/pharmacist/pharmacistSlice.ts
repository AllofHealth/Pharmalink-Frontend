import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PharmacistState {
  pharmacistCurrentTab: string;
}

const initialState: PharmacistState = {
  pharmacistCurrentTab: "Overview",
};

const Pharmacist = createSlice({
  name: "pharmacist",
  initialState,
  reducers: {
    setPharmacistCurrentTab(state, action: PayloadAction<string>) {
      state.pharmacistCurrentTab = action.payload;
    },
  },
});

export const { setPharmacistCurrentTab } = Pharmacist.actions;
export default Pharmacist.reducer;
