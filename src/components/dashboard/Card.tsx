export default function Card({ data }: any) {
  return (
    <div className="shadow-xl bg-white flex flex-col justify-center items-center w-40 h-40 rounded-xl hover:-translate-y-4 duration-200">
      <div className="font-bold text-xl">{data.title}</div>
      <div>{data.result && data.result.toLocaleString()}</div>
      {data.sales}
      {data.purchase}
    </div>
  );
}
