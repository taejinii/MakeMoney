import { useAppDispatch } from "../../store/store";
import { openModal } from "../../store/modalSlice";
import { CSVLink } from "react-csv";
import { logoutAction } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "../common/Button";
export default function InventoryHeader({ data = [] }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("USER_ID");
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
  // 총구입가격 순이익 원화가격 등등 계싼해서 새로운 객체배열을 만들어서 써야한다.
  const logoutHandler = () => {
    if (!userId) {
      navigate("/login");
    }
    if (userId) {
      if (window.confirm("정말 로그아웃 하시겠습니까?")) {
        dispatch(logoutAction());
        window.location.reload();
      }
    }
  };
  const fileDownloadHandler = () => {
    if (window.confirm("파일을 다운로드 받으시겠습니까?")) {
      if (data.length === 0) {
        alert("다운로드할 데이터가 없습니다.");
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
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
              onClick={fileDownloadHandler}
            >
              CSV Download
            </CSVLink>
          </Button>
          <Button onClick={logoutHandler}>{userId ? "Logout" : "Login"}</Button>
        </div>
      </div>
      <p className="font-semibold">
        Manage your inventory of shoes,clothes, and collectibles.
      </p>
    </header>
  );
}
