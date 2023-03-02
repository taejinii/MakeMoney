import axios from "axios";
import { useState, useEffect } from "react";

export default function CompareIncome() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/items?buyDate_gte=2023-02-01&buyDate_lte=2023-02-31`
    );
    setData(data);
  };
  console.log("data", data);
  useEffect(() => {
    getData();
  }, []);
  const totalSales = data
    .map((el: any) => Number(el.sellPrice))
    .reduce((prev, curr) => prev + curr, 0);
  const totalPurchase = data
    .map((el: any) => Number(el.price) * 1317)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div className="flex flex-col border-2 items-stretch p-4 rounded-2xl">
      <header className="">
        <h1 className="text-2xl font-bold p-2">Preview</h1>
      </header>
      <main className="flex flex-col ">
        <div className="flex">
          <div className="p-2 border-r-2">
            <h3>Spending</h3>
            {totalPurchase.toLocaleString()}
          </div>
          <div className="p-2">
            <h3>Sales</h3>
            {totalSales.toLocaleString()}
          </div>
        </div>
        <div className="p-2">저번달보다 spending 이 몇퍼센트 증가</div>
        <div className="p-2">저번달보다 Sales 가 몇퍼센트 증가</div>
        <div className="p-2">수익률에 따른 이모티콘 변화</div>
      </main>
    </div>
  );
}
