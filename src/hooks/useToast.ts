import { v4 as uuidv4 } from "uuid";
import { addToast as add, removeToast } from "../store/toastSlice";
import { useAppDispatch } from "../store/store";

export interface ToastType {
  type: "success" | "error";
  title: string;
  text: string;
}
export default function useToast() {
  const dispatch = useAppDispatch();

  const deleteToast = (id: string) => {
    dispatch(removeToast(id));
  };
  const addToast = (toast: ToastType) => {
    const id = uuidv4();
    const toastId = {
      ...toast,
      id,
    };
    dispatch(add(toastId));
    setTimeout(() => {
      deleteToast(id);
    }, 3000);
  };

  return { addToast, deleteToast };
}
