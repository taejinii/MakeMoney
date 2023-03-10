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
  background-color: white;
  border-radius: 25px;
  z-index: 9999;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export default function Toast() {
  const { toasts } = useAppSelector((state) => state.toast);
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
            className={`cursor-pointer py-2 px-4   ${
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
