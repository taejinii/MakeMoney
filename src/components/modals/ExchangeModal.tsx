import axios from "axios";
import React from "react";
import styled from "styled-components";
import useModalClose from "../../hooks/useModalClose";
import Button from "../common/Button";
import { useState, useEffect } from "react";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { ModalBackDrop } from "./ItemEditorModal";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
interface CurrencyTypes {
  currencyCode: string;
  cashBuyingPrice: number;
  change: string;
  signedChangePrice: number;
  name: string;
  id: number;
}
interface Visible {
  visible: boolean;
}
const ModalWrapper = styled.div<Visible>`
  display: flex;
  position: fixed;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  padding: 20px;
  z-index: 20;
  right: 0;
  gap: 20px;
  transition: 0.3s;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transform: ${(props) =>
    props.visible ? "translateX(0px)" : "translateX(380px)"};
  background-color: white;
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
    exchangeRate();
  }, []);

  const today = `${new Date().getFullYear()}/${
    new Date().getMonth() + 1
  }/${new Date().getDate()}`;
  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}

      <ModalWrapper
        visible={isOpen}
        className="dark:bg-[#363a44] dark:text-white"
      >
        <header className="p-4 border-b-2 text-center font-mono font-bold text-xl ">
          <span>Today's exchange rate</span>
          <br />
          <span>{today}</span>
        </header>
        {currency?.map((el: CurrencyTypes) => {
          const conturyImage = () => {
            if (el.currencyCode === "EUR") {
              return "images/euro.png";
            } else if (el.currencyCode === "USD") {
              return "images/usa.png";
            } else if (el.currencyCode === "GBP") {
              return "images/uk.png";
            } else {
              return "images/japan.png";
            }
          };

          return (
            <div
              key={el.id}
              className="flex justify-center items-center p-4 rounded-xl shadow-xl hover:scale-105 transition-all  bg-[#f0efef] dark:bg-[#272b34]"
            >
              <img
                alt="flag"
                src={conturyImage()}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <span className="font-bold ">
                  {el.name} : {el.cashBuyingPrice}원
                </span>
                <span className="flex justify-center items-center ">
                  {el.signedChangePrice}원
                  {el.change === "RISE" ? (
                    <div className="flex font-bold text-emerald-800">
                      <AiOutlineRise color="green" fontSize={24} /> 상승
                    </div>
                  ) : (
                    <div className="flex font-bold text-red-700">
                      <AiOutlineFall color="red" fontSize={24} /> 하락
                    </div>
                  )}
                </span>
              </div>
            </div>
          );
        })}
        <Button onClick={() => dispatch(closeModal())}>Close</Button>
      </ModalWrapper>
    </>
  );
}
