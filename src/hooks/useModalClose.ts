import { useRef, useEffect } from "react";
import { useAppDispatch } from "../store/store";

interface ActionType {
  type: string;
  payload: undefined;
}

const useModalClose = (isOpen: boolean, closeModal: ActionType) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const modalClose = (e: MouseEvent) => {
      if (isOpen && ref.current?.contains(e.target as Node)) {
        dispatch(closeModal);
      }
    };
    document.addEventListener("click", modalClose);
    return () => {
      document.removeEventListener("click", modalClose);
    };
  }, [isOpen, closeModal, dispatch]);
  return ref;
};
export default useModalClose;
