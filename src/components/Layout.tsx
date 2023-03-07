import React from "react";
import { Outlet } from "react-router-dom";
import ExchangeModal from "./modals/ExchangeModal";
import ItemEditorModal from "./modals/ItemEditorModal";
import SideBar from "./sidebar/SideBar";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      {/* <ExchangeModal /> */}
      <ItemEditorModal />
      <Outlet />
    </div>
  );
}
