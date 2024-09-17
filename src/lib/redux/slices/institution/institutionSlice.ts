import type { CreateInstitutionValues, Institution } from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InstitutionState {
  institutionCurrentTab: string;
  currentInstitution: Institution | null;
  institutionSignUpValues: CreateInstitutionValues | null;
}

const initialState: InstitutionState = {
  institutionCurrentTab: "Overview",
  currentInstitution: null,
  institutionSignUpValues: null,
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
    setInstitutionSignUpValues(
      state,
      action: PayloadAction<CreateInstitutionValues>
    ) {
      state.institutionSignUpValues = action.payload;
    },
  },
});

export const {
  setInstitutionCurrentTab,
  setCurrentInstitution,
  setInstitutionSignUpValues,
} = InstitutionSlice.actions;
export default InstitutionSlice.reducer;
