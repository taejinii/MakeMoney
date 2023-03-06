export default function CompareIncome({ data, month }: any) {
  const totalSales = data
    .map((el: { sellPrice: string }) => Number(el.sellPrice))
    .reduce((prev: string, curr: string) => prev + curr, 0);
  const totalPurchase = data
    .map((el: { price: number }) => Number(el.price) * 1317)
    .reduce((prev: string, curr: string) => prev + curr, 0);
  return (
    <div className="flex flex-col  items-stretch p-4 rounded-2xl shadow-2xl bg-[#101322] text-white font-bold">
      <header>
        <h1 className="text-2xl  p-2">Preview</h1>
      </header>
      <main className="flex flex-col ">
        <div className="flex justify-around">
          <div className="p-2">
            <h3 className="text-md ">Spending</h3>
            {totalPurchase.toLocaleString()}₩
          </div>
          <div className="border-r-2"></div>
          <div className="p-2">
            <h3 className="text-md "> Sales</h3>
            {totalSales.toLocaleString()}₩
          </div>
        </div>
        <div className="p-2 text-center">
          Revenue is {(totalSales - totalPurchase).toLocaleString()}₩
        </div>
        <div className="p-2">저번달보다 spending 이 몇퍼센트 증가</div>
        <div className="p-2">저번달보다 Sales 가 몇퍼센트 증가</div>
        <div className="p-2">수익률에 따른 이모티콘 변화</div>
      </main>
    </div>
  );
}
