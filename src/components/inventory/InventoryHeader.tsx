import axios from "axios";
export default function InventoryHeader() {
  const addItem = () => {
    axios.post("http://localhost:3001/items", {
      buyDate: "21-02-26",
      buyPlace: "World",
      productName: "Hello",
      quantity: 5,
      price: 80,
      krwPrice: "522,676",
      shipExpense: "40,000",
      customsDuty: "World",
      totalPrice: "9999999999",
      sellPrice: 98132464,
      netProfit: "World",
    });
  };
  return (
    <header>
      <div className="flex justify-between items-center w-full mb-2">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <div className="flex gap-3">
          <button onClick={addItem}>아이템 추가</button>
          <button>엑셀 다운로드</button>
          <button>엑셀 업로드</button>
        </div>
      </div>
      <p>Manage your inventory of shoes,clothes, and collectibles.</p>
    </header>
  );
}
