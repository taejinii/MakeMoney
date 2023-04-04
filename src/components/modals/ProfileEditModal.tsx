import React, { useState, useEffect, ChangeEvent } from "react";
import { ModalContainer, ModalBackDrop } from "./ItemEditorModal";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { closeModal } from "../../store/modalSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "../../utils/api";
import Button from "../common/Button";
import defaultProfileImage from "../../defaultProfileImage.png";
import useModalClose from "../../hooks/useModalClose";
import useToast from "../../hooks/useToast";
import customAxios from "../../utils/axios";
import { useImageUpload } from "../../hooks/useImageUpload";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  profileImage: string;
}

export default function ProfileEditModal() {
  const userId = Number(localStorage.getItem("USER_ID"));
  const { data: userInfo } = useQuery<UserInfo>(["userInfo"], () =>
    getUserInfo(userId)
  );
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState(userInfo?.name);
  const { isOpen } = useAppSelector((state) => state.modal);
  const { imageStringData, uploadImage, setImageStringData } = useImageUpload();
  const ref = useModalClose(isOpen);
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: editProfileImage, isLoading } = useMutation(
    async () => {
      if (window.confirm("수정하시겠습니까?")) {
        return await customAxios.patch(`/users/${userId}`, {
          profileImage: imageStringData,
          name: userName,
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo"]);
        addToast({
          type: "success",
          title: "Success!",
          text: "Your profile has been successfully modified.",
        });
        dispatch(closeModal());
      },
    }
  );

  /**모달 오픈시 유저의 기존프로필이미지를  imageStringData 상태에 저장*/
  useEffect(() => {
    setImageStringData(userInfo?.profileImage as string);
  }, [userInfo?.profileImage, setImageStringData]);

  /**닉네임수정을한후 confirm 하지않고 모달을 닫은후 모달을 다시열었을때 기존 유저네임을 불러오기위한 코드 */
  useEffect(() => {
    setUserName(userInfo?.name);
  }, [setUserName, userInfo?.name, isOpen]);

  /**유저네임 변경값을 담는함수 */
  const userNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      <ModalContainer
        visible={isOpen}
        className="dark:bg-[#363a44] dark:text-white "
      >
        <header className="flex justify-between items-center border-b-2 p-4">
          <h1 className="text-2xl font-bold">Profile Edit</h1>
          <button onClick={() => dispatch(closeModal())} className="text-2xl">
            x
          </button>
        </header>
        <section className="flex flex-col justify-center items-center p-4 gap-20">
          <div className="w-48 h-48 relative">
            <h1 className="text-center text-2xl font-semibold">Image</h1>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={uploadImage}
            />
            <label htmlFor="fileInput" className="cursor-pointer relative ">
              <div className="absolute flex w-full h-full  justify-center items-center text-white font-bold text-xl opacity-0 hover:opacity-100 bg-black hover:bg-opacity-40 rounded-full">
                Edit
              </div>
              <img
                src={imageStringData ? imageStringData : defaultProfileImage}
                alt="profileImage"
                className="w-full h-full rounded-full border-4 border-gray-500 dark:border-white"
              />
            </label>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold">Name</h1>
            <input
              className="item-editor w-full text-center"
              value={userName}
              onChange={(e) => {
                userNameHandler(e);
              }}
            />
          </div>
        </section>
        <footer className="p-4">
          <Button onClick={editProfileImage}>
            {isLoading ? "Wait..." : "Confirm"}
          </Button>
        </footer>
      </ModalContainer>
    </>
  );
}
