import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import InventoryPage from "./pages/InventoryPage";
import DashboardPage from "./pages/DashboardPage";
import StockxPage from "./pages/StockxPage";
import LoginAndSignupPage from "./pages/LoginAndSignupPage";
import React from "react";
import GlobalModals from "./components/modals/GlobalModals";
function App() {
  return (
    <BrowserRouter>
      <GlobalModals />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="stockx" element={<StockxPage />} />
        </Route>
        <Route path="login" element={<LoginAndSignupPage />} />
        <Route path="signup" element={<LoginAndSignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
