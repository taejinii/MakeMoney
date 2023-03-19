import React, { useState, useEffect } from "react";
import { getItem, deleteItem } from "../utils/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryTable from "../components/inventory/InventoryTable";
import useToast from "../hooks/useToast";
import customAxios from "../utils/axios";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  box-shadow: -2px 0px 8px -1px #555555;
  border-radius: 40px 0px 0px 40px;
  background-color: white;
`;
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
export default function InventoryPage() {
  const [items, setItems] = useState<ItemsType[]>([]);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const { addToast } = useToast();
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (id: number) => {
      return customAxios.delete(`/items/${id}`);
    }
  );
  const { data } = useQuery({ queryKey: ["items"], queryFn: getItem });

  console.log(data);
  useEffect(() => {
    getItem().then((res) => {
      setItems(res);
    });
  }, [isSoldOut]);

  // const deleteItemHandler = (id: number) => {

  //     try {
  //         deleteItem(id)?.then(() => getItem().then((res) => setItems(res)));
  //         addToast({ type: "success", text: "Succefully deleted!!!" });
  //       } catch (err) {
  //           addToast({ type: "error", text: "Error occurred." });
  //           console.log(err);
  //         }
  //       };

  const handleCheck = async (check: boolean, id: number) => {
    await customAxios.patch(`/items/${id}`, {
      isSoldOut: check,
    });
    setIsSoldOut(!isSoldOut);
  };

  return (
    <>
      <Container>
        <InventoryHeader />
        <InventoryTable
          items={data}
          mutate={mutate}
          handleCheck={handleCheck}
        />
      </Container>
    </>
  );
}
