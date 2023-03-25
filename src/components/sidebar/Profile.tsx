import React from "react";
import profileImage from "../../내사진.jpeg";
export default function Profile() {
  const userName = "Taejin";
  return (
    <>
      <div className="w-20 h-20 ">
        <img
          src={profileImage}
          alt="profileImage"
          className="w-full h-full rounded-full"
        />
      </div>
      <div className="font-semibold text-lg">Hello!! {userName}</div>
    </>
  );
}
