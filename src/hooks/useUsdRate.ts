import { useState, useEffect } from "react";
import axios from "axios";
export default function useUsdRate() {
  const [usdRate, setUsdRate] = useState<number>(0);
  const getUsdRate = async () => {
    const response = await axios.get(process.env.REACT_APP_CURRENCY + "USD");
    setUsdRate(response.data[0].cashBuyingPrice);
  };
  useEffect(() => {
    getUsdRate();
  }, []);
  return usdRate;
}
