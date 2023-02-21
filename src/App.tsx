import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import StockxPage from "./pages/StockxPage";
import ExpensePage from "./pages/ExpensePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="stockx" element={<StockxPage />} />
          <Route path="expense" element={<ExpensePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
