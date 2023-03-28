import { ItemTypes } from "../components/inventory/InventoryTable";
export default function useCalculate(data: [], item: string) {
  const calculatedData = data
    .map((el: ItemTypes) => el[item])
    .reduce((prev: number, curr: number) => prev + curr, 0);

  return calculatedData;
}
