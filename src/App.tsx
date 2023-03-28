import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import StockxPage from "./pages/StockxPage";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="stockx" element={<StockxPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
