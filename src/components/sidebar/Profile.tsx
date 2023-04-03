import { getUserInfo } from "../../utils/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import { useQuery } from "@tanstack/react-query";
import defaultProfileImage from "../../defaultProfileImage.png";
import customAxios from "../../utils/axios";
import Button from "../common/Button";

interface UserInfoTypes {
  name: string;
  profileImage: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = Number(localStorage.getItem("USER_ID"));
  // useEffect(() => {
  //   if (!userId) {
  //     return; // userId가 없으면 함수 실행을 중지합니다.
  //   }
  //   getUserInfo(userId).then((res) => setUserInfo(res));
  // }, [userId]);
  const { data: userInfo } = useQuery(["userInfo"], () => getUserInfo(userId));
  const test = () => {
    if (!userId) {
      navigate("/login");
    } else {
      dispatch(openModal({ modalType: "ProfileEditModal" }));
    }
  };
  return (
    <>
      <div className="w-20 h-20 relative">
        <img
          src={
            userInfo?.profileImage ? userInfo.profileImage : defaultProfileImage
          }
          alt="profileImage"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="flex flex-col font-semibold text-lg">
        <span>{userInfo?.name ? userInfo.name : "Please Login"}</span>
        <Button onClick={test}>{userId ? "Edit" : "Login"}</Button>
      </div>
    </>
  );
}
