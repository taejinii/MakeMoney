import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

interface CurrencyTypes {
  currencyCode: string;
  cashBuyingPrice: number;
}

export default function ExchangeModal() {
  const currencyName = ["EUR", "USD", "GBP", "JPY"];
  const [currency, setCurrency] = useState<any>([]);
  const exchangeRate = async () => {
    let currencyArr: any = [];
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
    <div>
      {currency &&
        currency?.map((el: CurrencyTypes, idx: number) => {
          return (
            <div key={idx}>
              {el.currencyCode}:{el.cashBuyingPrice}
            </div>
          );
        })}
    </div>
  );
}
