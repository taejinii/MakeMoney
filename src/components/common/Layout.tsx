import React from "react";
import { Outlet } from "react-router-dom";
import Toast from "./Toast";
import SideBar from "../sidebar/SideBar";
import GlobalModals from "../modals/GlobalModals";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <Toast />
      <GlobalModals />
      <Outlet />
    </div>
  );
}
