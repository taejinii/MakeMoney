import { v4 as uuidv4 } from "uuid";
import { addToast as add, removeToast } from "../store/toastSlice";
import { useAppDispatch } from "../store/store";

export default function useToast() {
  const dispatch = useAppDispatch();

  const deleteToast = (id) => {
    dispatch(removeToast(id));
  };
  const addToast = (toast) => {
    const id = uuidv4();
    const toastId = {
      ...toast,
      id,
    };
    dispatch(add(toastId));
    // setTimeout(() => {
    //   deleteToast(id);
    // }, 3000);
  };

  return { addToast, deleteToast };
}
