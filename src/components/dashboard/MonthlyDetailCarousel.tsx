import Card from "./Card";
export interface EditData {
  title: string;
  result?: number;
  sales?: number;
  purchase?: number;
}
export default function MonthlyDetailCarousel({ data }: any) {
  let arr = [];
  const soldOut = data.filter((el: any) => el.isSoldOut === true);
  const unSoldOut = data.filter((el: any) => el.isSoldOut !== true);
  arr = [
    { title: "Sold", result: soldOut.length },
    { title: "UnSold", result: unSoldOut.length },
    { title: "Costs", result: 500000 },
    { title: "Sales", sales: 25 },
    { title: "Purchase", purchase: 50 },
  ];
  return (
    <div className="flex justify-around items-center  w-full h-full gap-4 shadow-2xl rounded-xl bg-[#d9bda9]">
      {arr.map((el: any, index) => {
        return <Card key={index} data={el} />;
      })}
    </div>
    // <div className="grid grid-cols-6 place-items-center items-center  w-full h-full gap-4 shadow-2xl rounded-xl bg-[#d9bda9] max-[1264px]:grid-cols-3">
    //   {arr.map((el: any) => {
    //     return <Card key={el.id} data={el} />;
    //   })}
    // </div>
  );
}
