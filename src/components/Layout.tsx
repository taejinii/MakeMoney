import { Outlet } from "react-router-dom";
import ItemEditorModal from "./modals/ItemEditorModal";
import SideBar from "./sidebar/SideBar";
export default function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <ItemEditorModal />
      <Outlet />
    </div>
  );
}
