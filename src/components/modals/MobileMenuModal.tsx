import useModalClose from "../../hooks/useModalClose";
import React from "react";
import DarkMode from "../sidebar/DarkMode";
import Button from "../common/Button";
import defaultProfileImage from "../../defaultProfileImage.png";
import { ModalWrapper } from "./ExchangeModal";
import { ModalBackDrop } from "./ItemEditorModal";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { closeModal, openModal } from "../../store/modalSlice";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../utils/api";
import { logoutAction } from "../../store/loginSlice";
import {
  FiLogIn,
  FiLogOut,
  FiBarChart,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";
interface UserType {
  name: string;
  profileImage: string;
  id: number;
}
export default function MobileMenuModal() {
  const { isOpen } = useAppSelector((state) => state.modal);
  const ref = useModalClose(isOpen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("USER_ID"));
  const { data: userInfo } = useQuery<UserType>(
    ["userInfo"],
    () => getUserInfo(userId),
    { enabled: !!userId }
  );
  const isLoginHandler = () => {
    if (userId) {
      if (window.confirm(`${userInfo?.name}님 로그아웃 하시겠습니까?`)) {
        dispatch(logoutAction());
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      <ModalWrapper
        visible={isOpen}
        className="dark:bg-[#363a44] dark:text-white font-semibold"
      >
        <header className="flex flex-col justify-center items-center">
          <img
            alt="유저프로필이미지"
            src={
              userInfo?.profileImage
                ? userInfo?.profileImage
                : defaultProfileImage
            }
            className="w-20 h-20 border-4 rounded-full dark:border-white mb-3"
          />

          <div>
            {userId
              ? `안녕하세요! ${userInfo?.name}님`
              : `로그인이 필요합니다.`}
          </div>
        </header>
        <section className="flex flex-col justify-center items-center gap-5 ">
          <Link to={"/inventory"} className="mobile-item ">
            <FiShoppingBag size={25} />
            Inventory
          </Link>
          <Link className="mobile-item" to={"/"}>
            <FiUser size={25} />
            Dashboard
          </Link>
          <button
            className="mobile-item"
            onClick={() => dispatch(openModal({ modalType: "ExchangeModal" }))}
          >
            <FiBarChart size={25} />
            <span className="">Exchange </span>
          </button>
          <button className="mobile-item" onClick={isLoginHandler}>
            {userId ? <FiLogOut size={25} /> : <FiLogIn size={25} />}
            <span className="">{userId ? "Logout" : "Login"}</span>
          </button>
          <DarkMode />
        </section>
        <footer>
          <Button onClick={() => dispatch(closeModal())}>Close</Button>
        </footer>
      </ModalWrapper>
    </>
  );
}
