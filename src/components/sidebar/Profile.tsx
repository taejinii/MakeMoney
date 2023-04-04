import { getUserInfo } from "../../utils/api";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import { useQuery } from "@tanstack/react-query";
import defaultProfileImage from "../../defaultProfileImage.png";
import Button from "../common/Button";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = Number(localStorage.getItem("USER_ID"));

  const { data: userInfo } = useQuery(
    ["userInfo", userId],
    () => getUserInfo(userId),
    { enabled: !!userId }
  );
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
          className="w-full h-full rounded-full border-2"
        />
      </div>
      <div className="flex flex-col font-semibold text-lg">
        <span>{userInfo?.name ? userInfo.name : "Login Please"}</span>
        <Button onClick={test}>{userId ? "Edit" : "Login"}</Button>
      </div>
    </>
  );
}
