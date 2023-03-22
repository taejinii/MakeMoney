import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  /* background-color: #96ceda; */
  background: linear-gradient(#ffffff, #96ceda);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
`;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
interface SalesType {
  buyDate: string;
}
export default function SalesChart({ data, month }) {
  const buyDate: string[] = data.map((el: SalesType) => el.buyDate);
  const labels = Array.from(new Set(buyDate.sort()));
  const dailyBuyCount = buyDate.reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false }, min: 0, ticks: { stepSize: 1 } },
    },
    elements: { point: { radius: 5 } },
    plugins: {
      legend: false,
      title: {
        display: true,
        color: "black",
        text: `${month} Monthly Checkout`,
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Checkout",
        data: Object.values(dailyBuyCount),
        borderColor: "#ffffff",
        backgroundColor: "#96ceda",
        tension: 0.2,
      },
    ],
  };
  return (
    <ChartContainer>
      <Line options={options} data={chartData} />
    </ChartContainer>
  );
}
