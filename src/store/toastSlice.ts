import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ToastType {
  type: "success" | "error";
  title: string;
  text: string;
  id: string;
}
interface ToastState {
  toasts: ToastType[];
}
const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastType>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast: ToastType) => {
        return toast.id !== action.payload;
      });
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
