import React, { useState } from "react";
import { getItem } from "../utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryTable from "../components/inventory/InventoryTable";
import customAxios from "../utils/axios";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  box-shadow: -2px 0px 8px -1px #555555;
  background-color: white;
`;

export default function InventoryPage() {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    (id: number) => {
      return customAxios.delete(`/items/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["items"]);
      },
    }
  );
  const handleCheck = async (check: boolean, id: number) => {
    await customAxios.patch(`/items/${id}`, {
      isSoldOut: check,
    });
    setIsSoldOut(!isSoldOut);
  };
  const { data } = useQuery({
    queryKey: ["items"],
    queryFn: getItem,
  });
  return (
    <>
      <Container className="dark:bg-[#363a44] dark:text-white">
        <InventoryHeader data={data} />
        <InventoryTable
          // items={data}
          deleteItem={mutate}
          handleCheck={handleCheck}
        />
      </Container>
    </>
  );
}
