import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isSystemAdminSidebarOpen: boolean;
  isApproveInstitutionModalOpen: boolean;
  isSuccessfullyAddedModalOpen: boolean;
  isAccessDeniedModalOpen: boolean;
  isActionNeededRoleModalOpen: boolean;
  isAcceptAdminModalOpen: boolean;
  isDeniedAdminModalOpen: boolean;
}

const initialState: ModalState = {
  isSystemAdminSidebarOpen: false,
  isApproveInstitutionModalOpen: false,
  isSuccessfullyAddedModalOpen: false,
  isAccessDeniedModalOpen: false,
  isActionNeededRoleModalOpen: false,
  isAcceptAdminModalOpen: false,
  isDeniedAdminModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSystemAdminSidebar(state) {
      state.isSystemAdminSidebarOpen = !state.isSystemAdminSidebarOpen;
    },
    toggleApproveInstitutionModal(state) {
      state.isApproveInstitutionModalOpen =
        !state.isApproveInstitutionModalOpen;
    },
    toggleSuccessfullyAddedModal(state) {
      state.isSuccessfullyAddedModalOpen = !state.isSuccessfullyAddedModalOpen;
    },
    toggleAccessDeniedModal(state) {
      state.isAccessDeniedModalOpen = !state.isAccessDeniedModalOpen;
    },
    toggleActionNeededRoleModal(state) {
      state.isActionNeededRoleModalOpen = !state.isActionNeededRoleModalOpen;
    },
    toggleAcceptAdminModal(state) {
      state.isAcceptAdminModalOpen = !state.isAcceptAdminModalOpen;
    },
    toggleDeniedAdminModal(state) {
      state.isDeniedAdminModalOpen = !state.isDeniedAdminModalOpen;
    },
  },
});

export const {
  toggleSystemAdminSidebar,
  toggleApproveInstitutionModal,
  toggleSuccessfullyAddedModal,
  toggleAccessDeniedModal,
  toggleActionNeededRoleModal,
  toggleAcceptAdminModal,
  toggleDeniedAdminModal,
} = modalSlice.actions;
export default modalSlice.reducer;
