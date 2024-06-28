import type { Institution } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InstitutionState {
  institutionCurrentTab: string;
  currentInstitution: Institution | null;
}

const initialState: InstitutionState = {
  institutionCurrentTab: "Overview",
  currentInstitution: null,
};

const InstitutionSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setInstitutionCurrentTab(state, action: PayloadAction<string>) {
      state.institutionCurrentTab = action.payload;
    },
    setCurrentInstitution(state, action: PayloadAction<Institution>) {
      state.currentInstitution = action.payload;
    },
  },
});

export const { setInstitutionCurrentTab, setCurrentInstitution } =
  InstitutionSlice.actions;
export default InstitutionSlice.reducer;
