import { useState, useEffect } from "react";
import axios from "axios";
import { getItem } from "../../utils/api";
interface ItemsType {
  id: number;
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
  const [items, setItmes] = useState<ItemsType[]>([]);
  // const getItems = async () => {
  //   const response = await axios.get("http://localhost:3001/items");
  //   setItmes(response.data);
  // };
  useEffect(() => {
    getItem().then((res) => setItmes(res));
  }, []);

  const deleteItem = (id: number) => {
    axios
      .delete(`http://localhost:3001/items/${id}`)
      .then(() => getItem().then((res) => setItmes(res)))
      .catch((err) => console.log(err));
  };

  const tableHeader: string[] = [
    "",
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
        {items.map((item) => {
          const krwPrice = item.quantity * (item.price * 1317);
          const duty = krwPrice * 0.25;
          const totalPrice = krwPrice + duty + item.shipExpense;
          return (
            <tr
              className="text-center whitespace-nowrap border-b-2 "
              key={item.id}
            >
              <td>{item.id}</td>
              <td>{item.buyDate}</td>
              <td>{item.buyPlace}</td>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{krwPrice}</td>
              <td>{item.shipExpense}</td>
              <td>{duty}</td>
              <td>{totalPrice}</td>
              <td>{item.sellPrice}</td>
              <td>{item.sellPrice - totalPrice}</td>
              <td>
                <button>수정</button>
                <button onClick={() => deleteItem(item.id)}>삭제</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
