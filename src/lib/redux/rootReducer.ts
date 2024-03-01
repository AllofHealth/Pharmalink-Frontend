import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./slices/modals/modalSlice";
import systemAdminReducer from "./slices/systemAdmin/systemAdminSlice";
import institutionReducer from "./slices/institution/institutionSlice";
import doctorReducer from "./slices/doctor/doctorSlice";
import patientReducer from "./slices/patient/patientSlice";
import pharmacistReducer from "./slices/pharmacist/pharmacistSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  systemAdmin: systemAdminReducer,
  institution: institutionReducer,
  doctor: doctorReducer,
  patient: patientReducer,
  pharmacist: pharmacistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
