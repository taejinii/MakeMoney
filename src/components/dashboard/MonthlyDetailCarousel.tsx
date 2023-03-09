import React from "react";
import Card from "./Card";
export interface EditData {
  title: string;
  result?: number;
  sales?: number;
  purchase?: number;
  image: string;
}

export default function MonthlyDetailCarousel({ data }) {
  const soldOut = data.filter(
    (el: { isSoldOut: boolean }) => el.isSoldOut === true
  );
  const cost = data
    .map((el: { shipExpense: number | string }) => Number(el.shipExpense))
    .reduce((prev: number, curr: number) => prev + curr, 0);

  const arr: EditData[] = [
    { title: "Purchase", purchase: data.length, image: "/images/purchase.png" },
    { title: "Sold", result: soldOut.length, image: "/images/sold.png" },
    {
      title: "UnSold",
      result: data.length - soldOut.length,
      image: "/images/unsold.png",
    },
    { title: "Costs", result: cost, image: "/images/cost.png" },
  ];
  return (
    <div className="flex justify-around items-center  w-full h-full gap-4 shadow-2xl rounded-xl bg-[#d9bda9]">
      {arr.map((el: EditData, index: number) => {
        return <Card key={index} data={el} />;
      })}
    </div>
  );
}
