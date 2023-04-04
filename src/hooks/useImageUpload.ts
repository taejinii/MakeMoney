import { useState, ChangeEvent } from "react";

export const useImageUpload = () => {
  const [imageStringData, setImageStringData] = useState("");
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const updateImage = e.target.files[0];
    const fileReader = new FileReader();
    if (!updateImage) return;
    fileReader.readAsDataURL(updateImage);
    fileReader.onloadend = (event) => {
      const base64String = (event.target?.result as string).replace(
        /^data:image\/(png|jpg);base64,/,
        ""
      );
      setImageStringData(base64String);
    };
  };
  return { imageStringData, uploadImage, setImageStringData };
};
