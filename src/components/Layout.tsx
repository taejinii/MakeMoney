import { Outlet } from "react-router-dom";
import AddItemModal from "./modals/AddItemModal";
import EditItemModal from "./modals/EditItemModal";
import SideBar from "./sidebar/SideBar";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <EditItemModal />
      <AddItemModal />
      <Outlet />
    </div>
  );
}
