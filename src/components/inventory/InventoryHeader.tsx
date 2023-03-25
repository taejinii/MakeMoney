import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import { CSVLink } from "react-csv";
import React from "react";
import Button from "../Button";
export default function InventoryHeader({ data = [] }) {
  const dispatch = useAppDispatch();
  const headers = [
    { label: "구매일", key: "buyDate" },
    { label: "구매처", key: "buyPlace" },
    { label: "제품명", key: "productName" },
    { label: "사이즈", key: "size" },
    { label: "수량", key: "quantity" },
    { label: "구매가($USD)", key: "price" },
    { label: "원화가격", key: "productName" },
    { label: "배대지 비용", key: "shipExpense" },
    { label: "관부가세", key: "productName" },
    { label: "총 구입가격", key: "productName" },
    { label: "판매가격", key: "sellPrice" },
    { label: "순이익", key: "productName" },
  ];
  console.log(data); // 총구입가격 순이익 원화가격 등등 계싼해서 새로운 객체배열을 만들어서 써야한다.
  return (
    <header>
      <div className="flex justify-between items-center w-full mb-2 ">
        <h1 className="text-4xl font-semibold">Inventory</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => dispatch(openModal({ modalType: "ItemModal" }))}
          >
            Add Item
          </Button>
          <Button>
            <CSVLink
              headers={headers}
              data={data}
              filename={`${new Date().getFullYear()} data`}
              onClick={() => {
                if (window.confirm("파일을 다운로드 받으시겠습니까?")) {
                  return true;
                } else {
                  return false;
                }
              }}
            >
              CSV Download
            </CSVLink>
          </Button>
          {/* <Button>CSV Import</Button> */}
        </div>
      </div>
      <p className="font-semibold">
        Manage your inventory of shoes,clothes, and collectibles.
      </p>
    </header>
  );
}
