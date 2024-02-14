import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./slices/modals/modalSlice";
import systemAdminReducer from "./slices/systemAdmin/systemAdminSlice";

const rootReducer = combineReducers({
  modal: modalReducer,
  systemAdmin: systemAdminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
