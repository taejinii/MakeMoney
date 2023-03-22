import React from "react";

export default function Card({ data }) {
  return (
    <div className="relative shadow-xl bg-white flex flex-col justify-center items-center w-36 h-36 rounded-xl hover:-translate-y-4 duration-200">
      <div className="absolute -top-4 w-10 h-10 rounded-full ">
        <img className="w-full h-full" src={data.image} alt="" />
      </div>
      <div className="font-bold text-xl">{data.title}</div>
      <div>{data.result && data.result.toLocaleString()}</div>
      {data.purchase}
    </div>
  );
}
