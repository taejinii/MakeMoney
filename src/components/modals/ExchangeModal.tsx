import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import useModalClose from "../../hooks/useModalClose";
import { ModalBackDrop } from "./ItemEditorModal";
interface CurrencyTypes {
  currencyCode: string;
  cashBuyingPrice: number;
}
interface Visible {
  visible: boolean;
}
const ModalWrapper = styled.div<Visible>`
  display: flex;
  position: fixed;
  width: 450px;
  height: 100vh;
  padding: 20px;
  z-index: 999;
  right: 0;
  background-color: white;
  transition: 0.3s;

  transform: ${(props) =>
    props.visible ? "translateY(0px)" : "translateY(380px)"};
`;

export default function ExchangeModal() {
  const currencyName = ["EUR", "USD", "GBP", "JPY"];
  const [currency, setCurrency] = useState<any>([]);
  const { isOpen } = useAppSelector((state) => state.modal);
  const ref = useModalClose(isOpen);
  const dispatch = useAppDispatch();

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
    console.log("s");
    exchangeRate();
  }, []);

  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      {isOpen && (
        <ModalWrapper visible={isOpen}>
          {currency?.map((el: CurrencyTypes, idx: number) => {
            return (
              <div key={idx} className="p-2">
                {el.currencyCode}:{el.cashBuyingPrice}
              </div>
            );
          })}
          <button onClick={() => dispatch(closeModal())}>x</button>
        </ModalWrapper>
      )}
    </>
  );
}
