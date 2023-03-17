import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import React from "react";
import Button from "../Button";
export default function InventoryHeader({ setItems }: any) {
  const dispatch = useAppDispatch();
  return (
    <header>
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-4xl font-semibold">Inventory</h1>
        <div className="flex gap-3">
          <Button
            width="100px"
            onClick={() => dispatch(openModal({ modalType: "ItemModal" }))}
          >
            Add Item
          </Button>
          <Button width="100px">CSV Export</Button>
          <Button width="100px">CSV Import</Button>
          <Button width="100px" onClick={() => alert("d")}>
            Dark Mode
          </Button>
        </div>
      </div>
      <p className="font-semibold">
        Manage your inventory of shoes,clothes, and collectibles.
      </p>
    </header>
  );
}
