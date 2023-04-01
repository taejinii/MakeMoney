import { Container } from "./InventoryPage";
import React, { useState, useEffect } from "react";
import { getCurMonth, getPrevMonth, getYear } from "../utils/getDate";
import customAxios from "../utils/axios";
import CompareIncome from "../components/dashboard/CompareIncome";
import SalesChart from "../components/dashboard/SalesChart";
import MonthlyDetailCarousel from "../components/dashboard/MonthlyDetailCarousel";

interface selectTypes {
  id: number;
  month: string;
}

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [month, setMonth] = useState(getCurMonth(new Date()));
  const userId = localStorage.getItem("USER_ID");
  const year = getYear(new Date());
  const prevMonth = getPrevMonth(Number(month));
  // const getData = async () => {
  //   const { data } = await customAxios.get(
  //     `/items?buyDate_gte=${year}-${month}-01&buyDate_lte=${year}-${month}-31&userId=${userId}`
  //   );
  //   setData(data);
  // };
  const getData = async () => {
    const { data } = await customAxios.get(`/items?userId=${userId}`);
    setData(data);
  };
  console.log(data);
  const getPrevData = async () => {
    const { data } = await customAxios.get(
      `/items?buyDate_gte=${year}-${prevMonth}-01&buyDate_lte=${year}-${prevMonth}-31`
    );
    setPrevData(data);
  };

  useEffect(() => {
    getData();
    getPrevData();
  }, [month]);

  const selectList: selectTypes[] = [
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

  const onMonth = (e: any) => {
    setMonth(e.target.value);
  };
  return (
    <Container className="gap-5 dark:bg-[#363a44]">
      <select
        onChange={onMonth}
        className="gap-5  w-40 rounded-xl shadow-xl border-2 border-black font-bold"
      >
        <option value="" selected disabled hidden>
          Choose Month
        </option>
        {selectList.map((el) => {
          return <option key={el.id}>{el.month}</option>;
        })}
      </select>
      <div className="flex flex-row justify-between gap-5">
        <CompareIncome data={data} month={month} prevData={prevData} />
        <SalesChart data={data} month={month} />
      </div>
      <MonthlyDetailCarousel data={data} />
    </Container>
  );
}
