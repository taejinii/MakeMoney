import React, { useState } from "react";
import { getItem } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryTable from "../components/inventory/InventoryTable";
import MobileMenuButton from "../components/common/MobileMenuButton";
import { SelectMonth } from "../components/common/SelectMonth";
import { getCurMonth } from "../utils/getDate";
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
  const [month, setMonth] = useState(getCurMonth(new Date()));
  const year = new Date().getFullYear();
  console.log(year, month);
  const { data, isLoading } = useQuery({
    queryKey: ["items", year, month],
    queryFn: () => getItem(year, month),
  });
  console.log(month);
  return (
    <>
      <Container className="dark:bg-[#363a44] dark:text-white">
        <MobileMenuButton />
        <SelectMonth updateMonth={setMonth} />

        <InventoryHeader data={data} />
        <InventoryTable isLoading={isLoading} items={data} />
      </Container>
    </>
  );
}
