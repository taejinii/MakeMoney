import { Link } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import { RiDropboxFill } from "react-icons/ri";
import React from "react";
import DarkMode from "./DarkMode";
export default function SideBarItems() {
  const dispatch = useAppDispatch();
  return (
    <ul className="flex flex-col justify-start items-center gap-3 h-full w-full mt-5 font-semibold">
      Menu
      <Link to={"/"} className="sidebar-btn">
        <div className="mr-1">
          <MdSpaceDashboard />
        </div>
        <div>Dashboard</div>
      </Link>
      <Link to={"inventory"} className="sidebar-btn">
        <div className="mr-1">
          <RiDropboxFill />
        </div>
        <div>Inventory</div>
      </Link>
      <button
        className="sidebar-btn"
        onClick={() => dispatch(openModal({ modalType: "ExchangeModal" }))}
      >
        <div>Exchange</div>
      </button>
      <DarkMode />
    </ul>
  );
}
