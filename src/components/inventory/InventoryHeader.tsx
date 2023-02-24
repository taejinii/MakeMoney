import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
export default function InventoryHeader() {
  const dispatch = useAppDispatch();
  return (
    <header>
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <div className="flex gap-3">
          <button onClick={() => dispatch(openModal())}>아이템 추가</button>
          <button>엑셀 다운로드</button>
          <button>엑셀 업로드</button>
        </div>
      </div>
      <p>Manage your inventory of shoes,clothes, and collectibles.</p>
    </header>
  );
}
