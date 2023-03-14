import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface CurrencyTypes {
  currencyCode: string;
  cashBuyingPrice: number;
}
const slideModal = keyframes`
  0%{
    transform: translateX(100%);
  }
  100%{
    transform: translateX(0);
  }
`;
const ModalWrapper = styled.div`
  position: fixed;
  border: 1px solid black;
  right: 0px;
  height: 100vh;
  padding: 20px;
  z-index: 999;
  background-color: white;
  animation: ${slideModal} 0.5s ease-in-out;
  visibility: visible;
`;

export default function ExchangeModal() {
  const currencyName = ["EUR", "USD", "GBP", "JPY"];
  const [currency, setCurrency] = useState<any>([]);
  console.log(currency);
  const exchangeRate = async () => {
    let currencyArr: string[] = [];
    for (let i = 0; i < currencyName.length; i++) {
      const response = await axios.get(
        process.env.REACT_APP_CURRENCY + `${currencyName[i]}`
      );
      currencyArr.push(response.data[0]);
    }
    return setCurrency(currencyArr);
  };
  useEffect(() => {
    exchangeRate();
  }, []);

  return (
    <ModalWrapper>
      {currency &&
        currency?.map((el: CurrencyTypes, idx: number) => {
          return (
            <div key={idx} className="p-2">
              {el.currencyCode}:{el.cashBuyingPrice}
            </div>
          );
        })}
    </ModalWrapper>
  );
}
