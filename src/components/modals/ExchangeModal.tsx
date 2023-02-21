import axios from "axios";
import { useState, useEffect } from "react";

interface CurrencyTypes {
  currencyCode: string;
  cashBuyingPrice: number;
}

export default function ExchangeModal() {
  const currencyName = ["EUR", "USD", "GBP", "JPY"];
  const [currency, setCurrency] = useState<any>([]);
  const exchangeRate = async () => {
    let currencyArr = [];
    for (let i = 0; i < currencyName.length; i++) {
      const response = await axios.get(
        `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRW${currencyName[i]}`
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
