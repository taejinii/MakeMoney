import { Link } from "react-router-dom";
export default function SideBarItems() {
  const menuItems: string[] = ["Dashboard", "Inventory", "StockX", "Expense"];
  return (
    <ul className="flex flex-col justify-start items-center gap-3 h-full w-full mt-5">
      Menu
      {menuItems.map((menu, idx) => {
        return (
          <Link key={idx} to={menu.toLowerCase()} className="flex">
            <div>img</div>
            {menu}
          </Link>
        );
      })}
    </ul>
  );
}
