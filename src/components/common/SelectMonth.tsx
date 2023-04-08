import React from "react";

interface selectTypes {
  id: number;
  month: string;
}
const selectList = [
  { id: 1, month: "01" },
  { id: 2, month: "02" },
  { id: 3, month: "03" },
  { id: 4, month: "04" },
  { id: 5, month: "05" },
  { id: 6, month: "06" },
  { id: 7, month: "07" },
  { id: 8, month: "08" },
  { id: 9, month: "09" },
  { id: 10, month: "10" },
  { id: 11, month: "11" },
  { id: 12, month: "12" },
];
interface SetStateType {
  updateMonth: React.Dispatch<React.SetStateAction<string | number>>;
}
export const SelectMonth = ({ updateMonth }: SetStateType) => {
  const monthHandler = (e: any) => {
    updateMonth(e.target.value);
  };
  return (
    <select
      onChange={monthHandler}
      className="gap-5 md:w-36 md:mb-0 mb-3 rounded-md p-[4px] shadow-xl border-2 border-black font-bold dark:text-black"
    >
      <option value="" selected disabled hidden>
        Choose Month
      </option>
      {selectList.map((el: selectTypes) => {
        return <option key={el.id}>{el.month}</option>;
      })}
    </select>
  );
};
