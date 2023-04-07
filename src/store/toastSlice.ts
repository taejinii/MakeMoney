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
    /**addToast 는 새로운배열을 만드는것이아닌 직접 push를 하여 배열을 변경하는것이기때문에 return 키워드 불필요. */
    addToast: (state, action: PayloadAction<ToastType>) => {
      state.toasts.push(action.payload);
    },
    /**removeToast 는 filter 메서드를 사용하여 새로운 배열을 반환해주어야하기때문에 return 키워드가 필요. */
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast: ToastType) => {
        return toast.id !== action.payload;
      });
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
