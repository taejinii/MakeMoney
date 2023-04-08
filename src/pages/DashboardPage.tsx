import { Container } from "./InventoryPage";
import React, { useState, useEffect } from "react";
import { getCurMonth, getPrevMonth } from "../utils/getDate";
import customAxios from "../utils/axios";
import CompareIncome from "../components/dashboard/CompareIncome";
import SalesChart from "../components/dashboard/SalesChart";
import MonthlyDetailCarousel from "../components/dashboard/MonthlyDetailCarousel";
import MobileMenuButton from "../components/common/MobileMenuButton";
import { SelectMonth } from "../components/common/SelectMonth";
export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [month, setMonth] = useState(getCurMonth(new Date()));
  const userId = localStorage.getItem("USER_ID");
  const year = new Date().getFullYear();
  const prevMonth = getPrevMonth(Number(month));
  const getData = async () => {
    const { data } = await customAxios.get(
      `/items?buyDate_gte=${year}-${month}-01&buyDate_lte=${year}-${month}-31&userId=${userId}`
    );
    setData(data);
  };
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
  // 여기는 리액트쿼리를 사용했는데 그데이터를 다시 State저장? 이럴필요가잇을까 그리고 차트랑 캐러셀에 제대로 렌더링이안되는듯 수정필요

  return (
    <Container className="gap-5 dark:bg-[#363a44]">
      <MobileMenuButton />
      <SelectMonth updateMonth={setMonth} />
      <div className="flex flex-row justify-between gap-5">
        <CompareIncome data={data} month={month} prevData={prevData} />
        <SalesChart data={data} month={month} />
      </div>
      <MonthlyDetailCarousel data={data} />
    </Container>
  );
}
