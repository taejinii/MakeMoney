import React, { useState } from "react";
import { getItem } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { SelectMonth } from "../components/common/SelectMonth";
import { getCurMonth } from "../utils/getDate";
import styled from "styled-components";
import InventoryHeader from "../components/inventory/InventoryHeader";
import InventoryTable from "../components/inventory/InventoryTable";
import MobileMenuButton from "../components/common/MobileMenuButton";
import useUsdRate from "../hooks/useUsdRate";
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
  const usdRate = useUsdRate();

  const { data, isLoading } = useQuery(
    ["items", year, month],
    () => getItem(year, month),
    {
      select: (data) =>
        data.map((item) => {
          const krwPrice = item.quantity * (item.price * usdRate);
          const duty = krwPrice * 0.25;
          const totalPrice = krwPrice + duty + item.shipExpense;
          const profit = item.sellPrice - totalPrice;
          return { ...item, krwPrice, duty, totalPrice, profit };
        }),
    }
  );
  console.log(data);
  return (
    <>
      <Container className="dark:bg-[#363a44] dark:text-white">
        <MobileMenuButton />
        <SelectMonth updateMonth={setMonth} />
        <InventoryHeader data={data} month={month} />
        <InventoryTable isLoading={isLoading} items={data} />
      </Container>
    </>
  );
}
