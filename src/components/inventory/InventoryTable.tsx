import { useState, useEffect } from "react";
import { getItem, deleteItem } from "../../utils/api";
import { openModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/store";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";

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
  isSoldOut: boolean;
  size: string;
}

export default function InventoryTable() {
  const [items, setItmes] = useState<ItemsType[]>([]);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [usdRate, setUsdRate] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getItem().then((res) => setItmes(res));
  }, [isSoldOut]);

  const deleteItemHandler = (id: number) => {
    deleteItem(id)?.then(() => getItem().then((res) => setItmes(res)));
  };
  const getUsdRate = async () => {
    const reponse = await axios.get(
      "https://v6.exchangerate-api.com/v6/4a46f80f2c45093574a4d443/latest/USD"
    );
    setUsdRate(reponse.data.conversion_rates.KRW);
  };
  useEffect(() => {
    getUsdRate();
  }, []);
  console.log(usdRate);
  const handleCheck = (check: boolean, id: number) => {
    axios.patch(`http://localhost:3001/items/${id}`, { isSoldOut: check });
    setIsSoldOut(!isSoldOut);
  };
  const tableHeader: string[] = [
    "판매여부",
    "구매일",
    "구매처",
    "제품명",
    "사이즈",
    "수량",
    "구매가($USD)",
    "원화 가격",
    "배대지비용",
    "관부가세",
    "총 구입가격",
    "판매가격",
    "순이익",
    "",
  ];
  return (
    <table>
      <thead>
        <tr className="whitespace-nowrap border-b-2 sticky -top-8 bg-white">
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
          const krwPrice = item.quantity * (item.price * usdRate);
          const duty = krwPrice * 0.25;
          const totalPrice = krwPrice + duty + item.shipExpense;
          const netProfit = item.sellPrice - totalPrice;
          return (
            <tr
              className="text-center whitespace-nowrap font-semibold hover:drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)]"
              key={item.id}
            >
              <td className="p-2">
                <input
                  type={"checkbox"}
                  checked={item.isSoldOut}
                  onChange={(e) => handleCheck(e.target.checked, item.id)}
                />
              </td>
              <td>{item.buyDate}</td>
              <td>{item.buyPlace}</td>
              <td
                className={item.isSoldOut ? "text-green-600" : "text-blue-600"}
              >
                {item.productName}
              </td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>{krwPrice.toLocaleString()}</td>
              <td>{item.shipExpense}</td>
              <td>{duty.toLocaleString()}</td>
              <td className="text-red-600">-{totalPrice.toLocaleString()}</td>
              <td className="text-black">{item.sellPrice.toLocaleString()}</td>

              <td className={netProfit > 0 ? "text-green-600" : "text-red-600"}>
                {netProfit.toLocaleString()}
              </td>

              <td>
                <button
                  className="mr-1"
                  onClick={() =>
                    dispatch(openModal({ isEdit: true, itemId: item.id }))
                  }
                >
                  <AiTwotoneEdit />
                </button>
                <button onClick={() => deleteItemHandler(item.id)}>
                  <AiTwotoneDelete />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
