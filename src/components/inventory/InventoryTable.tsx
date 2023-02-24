import { useState, useEffect } from "react";
import { getItem, deleteItem } from "../../utils/api";
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
// const td = styled.td`
//   padding: 4px;
//   color: #4b76f9;
//   font-weight: 500;
// `;

export default function InventoryTable() {
  const [items, setItmes] = useState<ItemsType[]>([]);

  useEffect(() => {
    getItem().then((res) => setItmes(res));
  }, []);

  const deleteItemHandler = (id: number) => {
    deleteItem(id)?.then(() => getItem().then((res) => setItmes(res)));
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
        <tr className="whitespace-nowrap border-b-2">
          {tableHeader.map((header, index) => {
            return (
              <th key={index} className="py-3">
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const krwPrice = item.quantity * (item.price * 1317);
          const duty = krwPrice * 0.25;
          const totalPrice = krwPrice + duty + item.shipExpense;
          const netProfit = item.sellPrice - totalPrice;
          return (
            <tr
              className="text-center whitespace-nowrap text-blue-600 font-semibold"
              key={item.id}
            >
              <td className="p-2 ">{item.id}</td>
              <td>{item.buyDate}</td>
              <td>{item.buyPlace}</td>
              <td>{item.productName}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{krwPrice.toLocaleString()}</td>
              <td>{item.shipExpense}</td>
              <td>{duty.toLocaleString()}</td>
              <td className="text-red-500">-{totalPrice.toLocaleString()}</td>
              <td className="text-black">{item.sellPrice.toLocaleString()}</td>

              <td className={netProfit > 0 ? "text-green-600" : "text-red-500"}>
                {netProfit.toLocaleString()}
              </td>

              <td>
                <button>수정</button>
                <button onClick={() => deleteItemHandler(item.id)}>삭제</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
