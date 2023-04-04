import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/store";
import { FcApproval, FcHighPriority } from "react-icons/fc";
import useToast from "../../hooks/useToast";
interface ToastTypes {
  id: string;
  title: string;
  text: string;
  type: string;
}

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  right: 40px;
  z-index: 999;
`;

export default function Toast() {
  const { toasts } = useAppSelector((state) => state.toast);
  const { deleteToast } = useToast();
  return (
    <ToastWrapper>
      {toasts.map((toast: ToastTypes) => {
        return (
          <div
            key={toast.id}
            onClick={() => {
              deleteToast(toast.id);
            }}
            className={`flex items-start justify-start  cursor-pointer py-2 px-4 font-medium mt-4 bg-[#1c2023] animate-slideToast text-white border-l-4 shadow-xl ${
              toast.type === "success"
                ? "text-green-500 border-green-500"
                : "text-rose-500 border-rose-500"
            }`}
          >
            <div className="flex items-center justify-center  ">
              <div className="p-4">
                {toast.type === "success" ? (
                  <FcApproval size={25} />
                ) : (
                  <FcHighPriority size={25} />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between font-bold text-lg">
                {toast.title}
                <button
                  onClick={() => deleteToast(toast.id)}
                  className="hover:bg-slate-500 px-2 rounded-lg"
                >
                  x
                </button>
              </div>
              <div className="font-light">{toast.text}</div>
            </div>
          </div>
        );
      })}
    </ToastWrapper>
  );
}
