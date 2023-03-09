import React from "react";

export default function CompareIncome({ data, month, prevData }: any) {
  const sales = data
    .map((el: { sellPrice: string }) => Number(el.sellPrice))
    .reduce((prev: number, curr: number) => prev + curr, 0);
  const spending =
    data
      .map((el: { price: number }) => Number(el.price) * 1317)
      .reduce((prev: number, curr: number) => prev + curr, 0) +
    data
      .map((el: { shipExpense: number }) => Number(el.shipExpense))
      .reduce((prev: number, curr: number) => prev + curr, 0);
  const prevSales = prevData
    .map((el: { sellPrice: string }) => Number(el.sellPrice))
    .reduce((prev: number, curr: number) => prev + curr, 0);
  const prevSpending =
    prevData
      .map((el: { price: number }) => Number(el.price) * 1317)
      .reduce((prev: number, curr: number) => prev + curr, 0) +
    prevData
      .map((el: { shipExpense: number }) => Number(el.shipExpense))
      .reduce((prev: number, curr: number) => prev + curr, 0);
  console.log("sales", sales);
  console.log("spending", spending);
  console.log("prevSales", prevSales);
  console.log("prevSpending", prevSpending);
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
