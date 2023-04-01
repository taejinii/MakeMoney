import React, { useState, useEffect } from "react";
import { openModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/store";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "../../utils/api";
import styled from "styled-components";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
export interface ItemTypes {
  buyDate: string;
  buyPlace: string;
  id: number;
  isSoldOut: boolean;
  productName: string;
  quantity: number;
  sellPrice: number;
  shipExpense: number;
  size: string;
  price: number;
}

const BodyTr = styled.tr`
  text-align: center;
  white-space: nowrap;
  font-weight: 600;
  &:hover {
    background: rgba(109, 110, 109, 0.3);
  }
`;
const HeadTr = styled.tr`
  white-space: nowrap;
  border-bottom: solid 2px gray;
  position: static;
  top: -40px;
`;

export default function InventoryTable({ deleteItem, handleCheck }) {
  const [usdRate, setUsdRate] = useState<number>(0);
  const dispatch = useAppDispatch();

  const getUsdRate = async () => {
    const reponse = await axios.get(process.env.REACT_APP_USD);
    setUsdRate(reponse.data.conversion_rates.KRW);
  };
  useEffect(() => {
    getUsdRate();
  }, []);

  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getItem,
  });
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
  console.log(items);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {items && items.length !== 0 ? (
        <table>
          <thead>
            <HeadTr>
              {tableHeader.map((header, index) => {
                return (
                  <th key={index} className="py-3">
                    {header}
                  </th>
                );
              })}
            </HeadTr>
          </thead>
          <tbody>
            {items.map((item: ItemTypes) => {
              const krwPrice =
                item.quantity * (item.price * Math.round(usdRate));
              const duty = krwPrice * 0.25;
              const totalPrice = krwPrice + duty + item.shipExpense;
              const netProfit = item.sellPrice - totalPrice;
              return (
                <BodyTr
                  className="dark:hover:bg-white dark:hover:bg-opacity-20"
                  key={item.id}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={item.isSoldOut}
                      onChange={(e) =>
                        handleCheck({ check: e.target.checked, id: item.id })
                      }
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
                  <td>{item.sellPrice.toLocaleString()}</td>

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
                    <button onClick={() => deleteItem(item.id)}>
                      <AiTwotoneDelete />
                    </button>
                  </td>
                </BodyTr>
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
