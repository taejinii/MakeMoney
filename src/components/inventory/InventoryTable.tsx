import React, { useState, useEffect } from "react";
import { openModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/store";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";

export default function InventoryTable({
  items,
  deleteItemHandler,
  handleCheck,
}) {
  // const [items, setItmes] = useState<ItemsType[]>([]);
  const [usdRate, setUsdRate] = useState<number>(0);
  const dispatch = useAppDispatch();

  const getUsdRate = async () => {
    const reponse = await axios.get(process.env.REACT_APP_USD);
    setUsdRate(reponse.data.conversion_rates.KRW);
  };
  useEffect(() => {
    getUsdRate();
  }, []);

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
    <>
      {items && items.length !== 0 ? (
        <table>
          <thead>
            <tr className="whitespace-nowrap border-b-2 sticky -top-10 bg-white">
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
              const krwPrice =
                item.quantity * (item.price * Math.round(usdRate));
              const duty = krwPrice * 0.25;
              const totalPrice = krwPrice + duty + Number(item.shipExpense);
              const netProfit = item.sellPrice - totalPrice;
              return (
                <tr
                  className="text-center whitespace-nowrap font-semibold hover:bg-opacity-10 hover:bg-black"
                  key={item.id}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={item.isSoldOut}
                      onChange={(e) => handleCheck(e.target.checked, item.id)}
                    />
                  </td>
                  <td>{item.buyDate}</td>
                  <td
                    className={
                      item.isSoldOut ? "text-green-600" : "text-blue-600"
                    }
                  >
                    {item.buyPlace}
                  </td>
                  <td
                    className={
                      item.isSoldOut ? "text-green-600" : "text-blue-600"
                    }
                  >
                    {item.productName}
                  </td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>{krwPrice.toLocaleString()}</td>
                  <td>{item.shipExpense}</td>
                  <td>{duty.toLocaleString()}</td>
                  <td className="text-red-600">
                    -{totalPrice.toLocaleString()}
                  </td>
                  <td className="text-black">
                    {Number(item.sellPrice).toLocaleString()}
                  </td>

                  <td
                    className={
                      netProfit > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {netProfit.toLocaleString()}
                  </td>

                  <td>
                    <button
                      className="mr-1"
                      onClick={() =>
                        dispatch(
                          openModal({
                            modalType: "ItemModal",
                            isEdit: true,
                            itemId: item.id,
                          })
                        )
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
      ) : (
        <div className="flex border-4 shadow-lg rounded-xl w-full h-full">
          <div className="m-auto w-80 h-80 ">
            <video autoPlay muted loop>
              <source src="videos/Noitem.mp4" />
            </video>
            <div className="font-semibold">NO item UserName!!</div>
            <div className="font-semibold">
              Click Add item Button to manage your items &#x1F31F;
            </div>
          </div>
        </div>
      )}
    </>
  );
}
