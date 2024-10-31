import type {
  CreatePatientValues,
  GetPatientMessage,
  Prescription,
} from "@/lib/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PatientState {
  patientCurrentTab: string;
  currentPrescription: Prescription | null;
  approvalType: string;
  approveRequestFamilyMemberMedicalRecord: number;
  patientSignupValues: CreatePatientValues | null;
  currentPatientData: GetPatientMessage | null;
  currentRecord: number;
}

const initialState: PatientState = {
  patientCurrentTab: "Overview",
  currentPrescription: null,
  approvalType: "",
  approveRequestFamilyMemberMedicalRecord: 0,
  patientSignupValues: null,
  currentPatientData: null,
  currentRecord: 0,
};

const Patient = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientCurrentTab(state, action: PayloadAction<string>) {
      state.patientCurrentTab = action.payload;
    },
    setCurrentPrescription(state, action: PayloadAction<Prescription>) {
      state.currentPrescription = action.payload;
    },
    setApprovalType(state, action: PayloadAction<string>) {
      state.approvalType = action.payload;
    },
    setApproveRequestFamilyMemberMedicalRecord(
      state,
      action: PayloadAction<number>
    ) {
      state.approveRequestFamilyMemberMedicalRecord = action.payload;
      console.log(action.payload);
    },
    setPatientSignupValues(state, action: PayloadAction<CreatePatientValues>) {
      state.patientSignupValues = action.payload;
    },
    setCurrentPatientData(state, action: PayloadAction<GetPatientMessage>) {
      state.currentPatientData = action.payload;
    },
    setCurrentRecord(state, action: PayloadAction<number>) {
      state.currentRecord = action.payload;
    },
  },
});

export const {
  setPatientCurrentTab,
  setCurrentPrescription,
  setApprovalType,
  setApproveRequestFamilyMemberMedicalRecord,
  setPatientSignupValues,
  setCurrentPatientData,
  setCurrentRecord,
} = Patient.actions;
export default Patient.reducer;
