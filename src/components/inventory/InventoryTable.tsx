import React, { useState } from "react";
import { openModal } from "../../store/modalSlice";
import { useAppDispatch } from "../../store/store";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, deleteItem, checkSoldout } from "../../utils/api";
import styled from "styled-components";
import LoadingSpinner from "../common/LoadingSpinner";
import useUsdRate from "../../hooks/useUsdRate";
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
  profit: number;
  duty: number;
  krwPrice: number;
  totalPrice: number;
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

interface SoldoutTypes {
  check: boolean;
  id: number;
}

export default function InventoryTable({ items, isLoading }) {
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
  const [isSoldOut, setIsSoldOut] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const usdRate = useUsdRate();
  const userId = Number(localStorage.getItem("USER_ID"));

  const { data: userInfo } = useQuery(
    ["userInfo", userId],
    () => getUserInfo(userId),
    {
      enabled: !!userId,
    }
  );
  const { mutate: deleteMutate } = useMutation(
    (id: number) => {
      return deleteItem(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["items"]);
      },
    }
  );
  const { mutate: checkSoldoutMutate } = useMutation(
    async ({ check, id }: SoldoutTypes) => {
      return checkSoldout(check, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["items"]);
        setIsSoldOut(!isSoldOut);
      },
    }
  );

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
                        checkSoldoutMutate({
                          check: e.target.checked,
                          id: item.id,
                        })
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
                  <td>{item.krwPrice.toLocaleString()}</td>
                  <td>{item.shipExpense}</td>
                  <td>{item.duty.toLocaleString()}</td>
                  <td className="text-red-600">
                    -{item.totalPrice.toLocaleString()}
                  </td>
                  <td>{item.sellPrice.toLocaleString()}</td>

                  <td
                    className={
                      item.profit > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {item.profit.toLocaleString()}
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
                    <button onClick={() => deleteMutate(item.id)}>
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
            <div className="font-semibold">
              {userInfo?.name
                ? userInfo?.name
                : "Please Login first my friend!"}
            </div>
            <div className="font-semibold">
              Click Add item Button to manage your items &#x1F31F;
            </div>
          </div>
        </div>
      )}
    </>
  );
}
