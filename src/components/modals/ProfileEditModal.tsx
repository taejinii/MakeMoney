import React, { useState, useEffect } from "react";
import { ModalContainer, ModalBackDrop } from "./ItemEditorModal";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { closeModal } from "../../store/modalSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo } from "../../utils/api";
import Button from "../common/Button";
import defaultProfileImage from "../../defaultProfileImage.png";
import useModalClose from "../../hooks/useModalClose";
import customAxios from "../../utils/axios";

export default function ProfileEditModal() {
  const [imageStringData, setImageStringData] = useState("");
  const { isOpen } = useAppSelector((state) => state.modal);
  const ref = useModalClose(isOpen);
  const dispatch = useAppDispatch();
  const userId = Number(localStorage.getItem("USER_ID"));
  const queryClient = useQueryClient();

  interface UserInfo {
    id: number;
    username: string;
    email: string;
    profileImage: string;
  }

  const { data: userInfo } = useQuery<UserInfo>(["userInfo"], () =>
    getUserInfo(userId)
  );
  const { mutate: editProfileImage } = useMutation(
    async () => {
      return await customAxios.patch(`/users/${userId}`, {
        profileImage: imageStringData,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );
  useEffect(() => {
    setImageStringData(userInfo?.profileImage as string);
  }, []);

  const updateProfileImage = (e) => {
    e.preventDefault();
    const updateImage = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(updateImage);
    fileReader.onloadend = (event) => {
      const base64String = (event.target?.result as string).replace(
        /^data:image\/(png|jpg);base64,/,
        ""
      );
      setImageStringData(base64String);
    };
  };
  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      <ModalContainer
        visible={isOpen}
        className="dark:bg-[#363a44] dark:text-white"
      >
        <header className="flex justify-between items-center p-4">
          <span>Profile Detail</span>
          <button onClick={() => dispatch(closeModal())} className="text-2xl">
            x
          </button>
        </header>
        <section className="flex justify-center items-center">
          <div className="w-40 h-40 relative">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={updateProfileImage}
            />
            <label htmlFor="fileInput" className="cursor-pointer relative ">
              <div className="absolute flex w-full h-full  justify-center items-center text-white font-bold text-xl opacity-0 hover:opacity-100 bg-black hover:bg-opacity-40 rounded-full">
                Edit
              </div>
              <img
                src={imageStringData ? imageStringData : defaultProfileImage}
                alt="profileImage"
                className="w-full h-full rounded-full border-8 border-gray-500 dark:border-white"
              />
            </label>
          </div>
        </section>
        <footer className="p-4">
          <Button onClick={editProfileImage}>Confirm</Button>
        </footer>
      </ModalContainer>
    </>
  );
}
