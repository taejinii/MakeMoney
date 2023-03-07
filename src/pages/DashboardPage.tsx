import { Container } from "./InventoryPage";
import { useState, useEffect } from "react";
import axios from "axios";
import CompareIncome from "../components/dashboard/CompareIncome";
import SalesChart from "../components/dashboard/SalesChart";
import MonthlyDetailCarousel from "../components/dashboard/MonthlyDetailCarousel";
interface selectTypes {
  id: number;
  month: string;
}
export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("01"); //
  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/items?buyDate_gte=2023-${month}-01&buyDate_lte=2023-${month}-31`
    );
    setData(data);
  };
  useEffect(() => {
    getData();
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
    <Container className="gap-5">
      <select
        onChange={onMonth}
        className="gap-5  w-20 rounded-xl shadow-xl border-2 border-black"
      >
        {selectList.map((el) => {
          return <option key={el.id}>{el.month}</option>;
        })}
      </select>
      <div className="flex flex-row justify-between gap-5">
        <CompareIncome data={data} month={month} />
        <SalesChart data={data} month={month} />
      </div>
      <MonthlyDetailCarousel data={data} />
    </Container>
  );
}
