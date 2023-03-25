import React from "react";
import useCalculate from "../../hooks/useCalculate";

export default function CompareIncome({ data, month, prevData }: any) {
  const krwPrice = useCalculate(data, "price") * 1317;
  const duty = krwPrice * 0.25;
  const sales = useCalculate(data, "sellPrice");
  const spending = krwPrice + useCalculate(data, "shipExpense") + duty;
  const prevSales = useCalculate(prevData, "sellPrice");
  const prevSpending =
    useCalculate(prevData, "price") * 1317 +
    useCalculate(prevData, "shipExpense");

  const salesRate = Math.round(((sales - prevSales) / prevSales) * 100);
  const spendingRate = Math.round(
    ((spending - prevSpending) / prevSpending) * 100
  );
  const getRate = (rate: number) => {
    if (month === "01") {
      return `It's the beginning of ${new Date().getFullYear()} Make Money!!!`;
    }
    if (isNaN(rate)) {
      return "There is no transaction record.";
    }
    if (rate === Infinity) {
      return "There is no transaction record from last month.";
    }
    if (rate > 0) {
      return `Sales increase ${rate}% from last month`;
    } else {
      return `Sales decrease ${rate}% from last month`;
    }
  };
  return (
    <div className="flex flex-col w-1/4 p-4 rounded-2xl shadow-2xl bg-[#101322] text-white font-bold">
      <header>
        <h1 className="text-2xl  p-4">{month}월 Preview</h1>
      </header>
      <main className="flex flex-col ">
        <div className="flex justify-around">
          <div className="p-4">
            <h3 className="text-md ">Spending</h3>
            <span className="text-red-400">{spending.toLocaleString()}₩</span>
          </div>
          <div className="border-r-2"></div>
          <div className="p-4">
            <h3 className="text-md "> Sales</h3>
            <span className="text-emerald-400">{sales.toLocaleString()}₩</span>
          </div>
        </div>
        <div className="p-2 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Profit is {(sales - spending).toLocaleString()}₩
          </span>
        </div>
        <div className="p-4">{getRate(salesRate)}</div>
        <div className="p-4">{getRate(spendingRate)}</div>
        <div className=" w-16 h-16 m-auto">
          <img
            className="w-full h-full "
            src={salesRate > 0 ? "images/good.png" : "images/bad.png"}
            alt="salesRateImage"
          />
        </div>
      </main>
    </div>
  );
}
