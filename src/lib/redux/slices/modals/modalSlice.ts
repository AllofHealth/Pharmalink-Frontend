import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
  isSidebarOpen: boolean;
  isApproveInstitutionModalOpen: boolean;
  isSuccessfullyAddedModalOpen: boolean;
  isAccessDeniedModalOpen: boolean;
  isActionNeededRoleModalOpen: boolean;
  isAcceptAdminModalOpen: boolean;
  isDeniedAdminModalOpen: boolean;
  isInstitutionActionNeededModalOpen: boolean;
  isInstitutionSuccessfullyModalOpen: boolean;
  isInstitutionAccessDeniedModalOpen: boolean;
  isSuccessfullyEditedMedicalRecordModalOpen: boolean;
  isActionNeededSharePrescriptionModalOpen: boolean;
  isAccessGrantedSharePrescriptionModalOpen: boolean;
  isAcessGrantedToRecordModalOpen: boolean;
  isGrantAccessToSpecificRecordsModalOpen: boolean;
  isSuccessfullyGrantedAccessToSpecificRecordsModalOpen: boolean;
  isDashboardSidebarOpen: boolean;
  isApproveRecordRequestModalOpen: boolean;
  isOtpSuccessModalOpen: boolean;
}

const initialState: ModalState = {
  isSidebarOpen: false,
  isApproveInstitutionModalOpen: false,
  isSuccessfullyAddedModalOpen: false,
  isAccessDeniedModalOpen: false,
  isActionNeededRoleModalOpen: false,
  isAcceptAdminModalOpen: false,
  isDeniedAdminModalOpen: false,
  isInstitutionActionNeededModalOpen: false,
  isInstitutionSuccessfullyModalOpen: false,
  isInstitutionAccessDeniedModalOpen: false,
  isSuccessfullyEditedMedicalRecordModalOpen: false,
  isActionNeededSharePrescriptionModalOpen: false,
  isAccessGrantedSharePrescriptionModalOpen: false,
  isAcessGrantedToRecordModalOpen: false,
  isGrantAccessToSpecificRecordsModalOpen: false,
  isSuccessfullyGrantedAccessToSpecificRecordsModalOpen: false,
  isDashboardSidebarOpen: false,
  isApproveRecordRequestModalOpen: false,
  isOtpSuccessModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSystemAdminSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
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
    toggleInstitutionActionNeededModal(state) {
      state.isInstitutionActionNeededModalOpen =
        !state.isInstitutionActionNeededModalOpen;
    },
    toggleInstitutionSuccessfullyAddedModal(state) {
      state.isInstitutionSuccessfullyModalOpen =
        !state.isInstitutionSuccessfullyModalOpen;
    },
    toggleInstitutionAccessDeniedModal(state) {
      state.isInstitutionAccessDeniedModalOpen =
        !state.isInstitutionAccessDeniedModalOpen;
    },
    toggleSuccessfullyEditedMedicalRecordModal(state) {
      state.isSuccessfullyEditedMedicalRecordModalOpen =
        !state.isSuccessfullyEditedMedicalRecordModalOpen;
    },
    toggleActionNeededSharePrescription(state) {
      state.isActionNeededSharePrescriptionModalOpen =
        !state.isActionNeededSharePrescriptionModalOpen;
    },
    toggleAccessGrantedSharePrescriptionModal(state) {
      state.isAccessGrantedSharePrescriptionModalOpen =
        !state.isAccessGrantedSharePrescriptionModalOpen;
    },
    toggleGrantAccessToRecord(state) {
      state.isAcessGrantedToRecordModalOpen =
        !state.isAcessGrantedToRecordModalOpen;
    },
    toggleGrantAccessToSpecificRecordsModal(state) {
      state.isGrantAccessToSpecificRecordsModalOpen =
        !state.isGrantAccessToSpecificRecordsModalOpen;
    },
    toggleSuccessfullyGrantedAccessToSpecificRecordsModal(state) {
      state.isSuccessfullyGrantedAccessToSpecificRecordsModalOpen =
        !state.isSuccessfullyGrantedAccessToSpecificRecordsModalOpen;
    },
    toggleDashboardSidebarOpen(state) {
      state.isDashboardSidebarOpen = !state.isDashboardSidebarOpen;
    },
    toggleApproveRecordRequest(state) {
      state.isApproveRecordRequestModalOpen =
        !state.isApproveRecordRequestModalOpen;
    },
    toggleOtpSuccessModal(state) {
      state.isOtpSuccessModalOpen = !state.isOtpSuccessModalOpen;
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
  toggleInstitutionActionNeededModal,
  toggleInstitutionSuccessfullyAddedModal,
  toggleInstitutionAccessDeniedModal,
  toggleSuccessfullyEditedMedicalRecordModal,
  toggleActionNeededSharePrescription,
  toggleAccessGrantedSharePrescriptionModal,
  toggleGrantAccessToRecord,
  toggleGrantAccessToSpecificRecordsModal,
  toggleSuccessfullyGrantedAccessToSpecificRecordsModal,
  toggleDashboardSidebarOpen,
  toggleApproveRecordRequest,
  toggleOtpSuccessModal,
} = modalSlice.actions;
export default modalSlice.reducer;
