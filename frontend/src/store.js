import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};
export const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  },
  preloadedState,
});
