import { useState, useEffect } from "react";
import axios from "axios";

interface IItemsType {
  buyDate: string;
  buyPlace: string;
  productName: string;
  quantity: number;
  price: number;
  krwPrice: number;
  shipExpense: number;
  customsDuty: number;
  totalPrice: number;
  sellPrice: number;
  netProfit: number;
}

export default function InventoryTable() {
  const [items, setItmes] = useState<Array<IItemsType>>([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:3001/items");
    setItmes(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const tableHeader: string[] = [
    "구매일",
    "구매처",
    "제품명",
    "수량",
    "구매가격($USD)",
    "원화구매가격",
    "배대지비용",
    "관부가세",
    "총 구입가격",
    "판매가격",
    "순이익",
  ];
  console.log(Number("2"));
  return (
    <table>
      <thead>
        <tr className="whitespace-nowrap">
          {tableHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => {
          return (
            <tr className="text-center whitespace-nowrap" key={index}>
              <td>{item.buyDate}</td>
              <td>{item.buyPlace}</td>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * 1317}</td>
              <td>{item.shipExpense}</td>
              <td>{item.price * 1317 * 0.25}</td>
              <td>
                {item.price * 1317 +
                  item.shipExpense +
                  item.price * 1317 * 0.25}
              </td>
              <td>{item.sellPrice}</td>
              <td>
                {item.sellPrice -
                  (item.price * 1317 + item.shipExpense + item.customsDuty)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
