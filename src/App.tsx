import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import StockxPage from "./pages/StockxPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<MainPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="stockx" element={<StockxPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
