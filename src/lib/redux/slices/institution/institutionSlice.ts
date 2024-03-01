import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InstitutionState {
  institutionCurrentTab: string;
}

const initialState: InstitutionState = {
  institutionCurrentTab: "Overview",
};

const InstitutionSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setInstitutionCurrentTab(state, action: PayloadAction<string>) {
      state.institutionCurrentTab = action.payload;
    },
  },
});

export const { setInstitutionCurrentTab } = InstitutionSlice.actions;
export default InstitutionSlice.reducer;
