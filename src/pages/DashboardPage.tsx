import { Container } from "./InventoryPage";
import CompareIncome from "../components/dashboard/CompareIncome";
import SalesChart from "../components/dashboard/SalesChart";
export default function DashboardPage() {
  return (
    <Container>
      <div className="flex flex-row justify-between">
        <CompareIncome />
        <SalesChart />
      </div>
    </Container>
  );
}
