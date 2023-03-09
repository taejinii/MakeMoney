import React from "react";
import useCalculate from "../../hooks/useCalculate";
export default function CompareIncome({ data, month, prevData }: any) {
  const sales = useCalculate(data, "sellPrice");
  const spending =
    useCalculate(data, "price") * 1317 + useCalculate(data, "shipExpense");
  const prevSales = useCalculate(prevData, "sellPrice");
  const prevSpending =
    useCalculate(prevData, "price") * 1317 +
    useCalculate(prevData, "shipExpense");

  const salesRate = Math.round(((sales - prevSales) / prevSales) * 100);
  const spendingRate = Math.round(
    ((spending - prevSpending) / prevSpending) * 100
  );

  return (
    <div className="flex flex-col  items-stretch p-4 rounded-2xl shadow-2xl bg-[#101322] text-white font-bold">
      <header>
        <h1 className="text-2xl  p-4">{month} Preview</h1>
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
        <div className="p-4">
          {salesRate > 0
            ? `Sales increase ${salesRate}% from last month`
            : `Sales decrease ${salesRate}% from last month`}
        </div>
        <div className="p-4">
          {spendingRate > 0
            ? `Sales increase ${spendingRate}% from last month`
            : `Sales decrease ${spendingRate}% from last month`}
        </div>
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
