import { configureStore } from "@reduxjs/toolkit";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteDetailReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdatePwReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
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
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    noteDetail: noteDetailReducer,
    userUpdate: userUpdateReducer,
    userUpdatePw: userUpdatePwReducer,
  },
  preloadedState,
});
