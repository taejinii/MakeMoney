export default function Card({ data }: any) {
  return (
    <div className="shadow-xl bg-white flex flex-col justify-center items-center w-40 h-40 rounded-xl">
      <div>{data.title}</div>
      {data.result}
    </div>
  );
}
