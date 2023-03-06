import Card from "./Card";
interface EditData {
  title: string;
  result: number;
}
export default function MonthlyDetailCarousel({ data }: any) {
  console.log("asd", data);
  let arr: EditData[] = [];
  const soldOut = data.filter((el: any) => el.isSoldOut === true);
  const unSoldOut = data.filter((el: any) => el.isSoldOut !== true);
  arr = [
    { title: "SoldOut", result: soldOut.length },
    { title: "UnSold", result: unSoldOut.length },
    { title: "Sales", result: 1 },
    { title: "Purchase", result: 1 },
    { title: "asd", result: 1 },
  ];
  console.log(arr);
  return (
    <div className="flex justify-around items-center  w-full h-full gap-4 shadow-2xl rounded-xl bg-[#d9bda9]">
      {arr.map((el: any) => {
        return <Card key={el.id} data={el} />;
      })}
    </div>
  );
}
