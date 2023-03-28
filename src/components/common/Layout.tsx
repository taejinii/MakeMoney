import React from "react";
import { Outlet } from "react-router-dom";
import Toast from "./Toast";
import SideBar from "../sidebar/SideBar";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <Toast />
      <Outlet />
    </div>
  );
}
