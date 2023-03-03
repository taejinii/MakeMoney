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
import { Line } from "react-chartjs-2";

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
export default function SalesChart({ data, month }: any) {
  console.log("data", data);
  const buyDate = data.map((el: any) => el.buyDate);
  const labels = Array.from(new Set(buyDate.sort()));
  const dailyBuyCount = buyDate.reduce((acc: any, cur: any) => {
    if (acc[cur]) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${month} Sales`,
      },
    },
  };
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: Object.values(dailyBuyCount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="w-full h-full">
      <Line options={options} data={chartData} />
    </div>
  );
}
