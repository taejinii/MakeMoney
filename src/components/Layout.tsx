import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
}
