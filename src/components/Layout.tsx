import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import Toast from "./Toast";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <Toast />
      <Outlet />
    </div>
  );
}
