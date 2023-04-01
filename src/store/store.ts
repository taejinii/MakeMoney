import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import modalSlice from "./modalSlice";
import toastSlice from "./toastSlice";
import loginSlice from "./loginSlice";
const store = configureStore({
  reducer: { modal: modalSlice, toast: toastSlice, login: loginSlice },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
