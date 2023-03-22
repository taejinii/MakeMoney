import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../store/store";
import useToast from "../hooks/useToast";
interface ToastTypes {
  id: string;
  text: string;
  type: string;
}

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 40px;
  font-weight: bold;
  font-size: x-large;
  z-index: 999;
`;

export default function Toast() {
  const { toasts } = useAppSelector((state) => state.toast);
  console.log("toasts", toasts);
  const { deleteToast } = useToast();
  console.log(toasts);
  return (
    <ToastWrapper>
      {toasts.map((toast: ToastTypes) => {
        return (
          <div
            key={toast.id}
            onClick={() => {
              deleteToast(toast.id);
            }}
            className={`cursor-pointer py-2 px-4 font-medium mt-4 bg-blue-600 text-white  rounded-md animate-slideToast shadow-2xl ${
              toast.type === "success" ? "text-green-700 " : "text-red-700"
            }`}
          >
            {toast.text}
          </div>
        );
      })}
    </ToastWrapper>
  );
}
