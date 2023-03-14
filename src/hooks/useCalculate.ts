export default function useCalculate(data: any, item: string) {
  console.log("d", data);
  const calculatedData = data
    .map((el: { item: string }) => Number(el[item]))
    .reduce((prev: number, curr: number) => prev + curr, 0);

  return calculatedData;
}
