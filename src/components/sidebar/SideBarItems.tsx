import { Link } from "react-router-dom";
export default function SideBarItems() {
  const menuItems: string[] = ["Home", "Dashboard", "Inventory", "StockX"];
  return (
    <ul className="flex flex-col">
      {menuItems.map((menu) => {
        return <Link to={menu.toLowerCase()}>{menu}</Link>;
      })}
    </ul>
  );
}
