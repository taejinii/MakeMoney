import { useRef, useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { closeModal } from "../store/modalSlice";

const useModalClose = (isOpen: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const modalClose = (e: MouseEvent) => {
      if (isOpen && ref.current?.contains(e.target as Node)) {
        dispatch(closeModal());
      }
    };
    document.addEventListener("click", modalClose);
    return () => {
      document.removeEventListener("click", modalClose);
    };
  }, [isOpen, dispatch]);
  return ref;
};
export default useModalClose;
