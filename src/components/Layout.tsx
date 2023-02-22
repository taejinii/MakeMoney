import { Outlet } from "react-router-dom";
import AddItemModal from "./modals/AddItemModal";
import SideBar from "./sidebar/SideBar";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <AddItemModal />
      <Outlet />
    </div>
  );
}
