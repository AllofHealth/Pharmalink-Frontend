import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SystemAdminState {
  systemAdminCurrentTab: string;
}

const initialState: SystemAdminState = {
  systemAdminCurrentTab: "ApproveInstitution",
};

const systemAdminSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSystemAdminCurrentTab(state, action: PayloadAction<string>) {
      state.systemAdminCurrentTab = action.payload;
    },
  },
});

export const { setSystemAdminCurrentTab } = systemAdminSlice.actions;
export default systemAdminSlice.reducer;
