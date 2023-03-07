import React from "react";

export default function CompareIncome({ data, month }: any) {
  console.log(data);
  const sales = data
    .map((el: { sellPrice: string }) => Number(el.sellPrice))
    .reduce((prev: string, curr: string) => prev + curr, 0);
  const spending =
    data
      .map((el: { price: number }) => Number(el.price) * 1317)
      .reduce((prev: string, curr: string) => prev + curr, 0) +
    data
      .map((el: { shipExpense: number }) => Number(el.shipExpense))
      .reduce((prev: string, curr: string) => prev + curr, 0);

  return (
    <div className="flex flex-col  items-stretch p-4 rounded-2xl shadow-2xl bg-[#101322] text-white font-bold">
      <header>
        <h1 className="text-2xl  p-4">Preview</h1>
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
        <div className="p-4">저번달보다 spending 이 몇퍼센트 증가</div>
        <div className="p-4">저번달보다 Sales 가 몇퍼센트 증가</div>
        <div className="p-4">수익률에 따른 이모티콘 변화</div>
      </main>
    </div>
  );
}
