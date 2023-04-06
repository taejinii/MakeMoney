import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import { HiMenu } from "react-icons/hi";
import React from "react";
import styled from "styled-components";

const MobileMenuBtn = styled.button`
  width: 40px;
  @media screen and (min-width: 1280px) {
    display: none;
  }
`;

export default function MobileMenuButton() {
  const dispatch = useAppDispatch();
  return (
    <MobileMenuBtn
      className="w-10"
      onClick={() => dispatch(openModal({ modalType: "MobileMenuModal" }))}
    >
      <HiMenu size={40} className="dark:text-white" />
    </MobileMenuBtn>
  );
}
