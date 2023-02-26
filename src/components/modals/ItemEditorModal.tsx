import styled from "styled-components";
import axios from "axios";
import useModalClose from "../../hooks/useModalClose";
import Button from "../Button";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect } from "react";

interface VisibleType {
  visible: boolean;
}

interface IFormInput {
  buyDate: string | Date;
  buyPlace: string;
  productName: string;
  quantity: number;
  price: number;
  size: string | number;
  shipExpense: number;
  sellPrice: number;
}

export const ModalBackDrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled.div<VisibleType>`
  position: fixed;
  display: ${(props) => (props.visible ? "block" : "none")};
  flex-direction: column;
  width: 400px;
  height: 600px;
  background-color: white;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  z-index: 20;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export default function ItemEditorModal() {
  const { isOpen, isEdit } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const ref = useModalClose(isOpen, closeModal());
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const getOriginData = useCallback(async () => {
    const result = await axios.get(
      `http://localhost:3001/items/${isEdit.itemId}`
    );
    reset(result.data);
  }, [isEdit.itemId, reset]);

  console.log("isEdit", isEdit);
  useEffect(() => {
    if (isEdit.itemId === 0 || isEdit.itemId === undefined || !isEdit) {
      reset({
        productName: "",
        buyPlace: "",
        size: "",
        buyDate: new Date(),
        price: 0,
        shipExpense: 0,
        sellPrice: 0,
        quantity: 0,
      });
      return;
    } else {
      getOriginData();
    }
  }, [getOriginData, isEdit, isEdit.itemId, reset]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    if (!isEdit) {
      axios.post("http://localhost:3001/items", {
        ...data,
        isSoldOut: false,
      });
      dispatch(closeModal());
      window.location.reload();
    } else {
      axios.patch(`http://localhost:3001/items/${isEdit.itemId}`, data);
      dispatch(closeModal());
      window.location.reload();
    }
  };
  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      <ModalContainer visible={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="flex justify-between items-center border-b-2 p-4">
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Item" : "Add Item"}
            </h2>
            <button onClick={() => dispatch(closeModal())}>x</button>
          </header>
          <section className="flex flex-col gap-1 p-3 ">
            <div className="flex items-center justify-center">
              <div>
                <span>구매일</span>
                <input
                  className="border-2 rounded-md  p-2"
                  type={"date"}
                  required
                  {...register("buyDate")}
                />
              </div>
              <div>
                <span>구매처</span>
                <input
                  className="border-2 rounded-md py-2 w-full"
                  required
                  {...register("buyPlace")}
                />
              </div>
            </div>
            <span>제품명</span>
            <input
              className="border-2 rounded-md py-2"
              required
              {...register("productName")}
            />
            <div className="flex ">
              <div>
                <span>사이즈</span>
                <input
                  className="border-2 rounded-md py-2"
                  type={"text"}
                  required
                  {...register("size")}
                />
              </div>
              <div>
                <span>수량</span>
                <input
                  className="border-2 rounded-md w-full py-2"
                  required
                  {...register("quantity", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
            <span>구매금액($USD)</span>
            <input
              className="border-2 rounded-md py-2"
              required
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            <span>배대지 비용</span>
            <input
              className="border-2 rounded-md py-2"
              defaultValue={0}
              {...register("shipExpense", {
                valueAsNumber: true,
              })}
            />
            <span>판매 가격</span>
            <input
              className="border-2 rounded-md py-2"
              defaultValue={0}
              {...register("sellPrice", {
                valueAsNumber: true,
              })}
            />
          </section>
          <footer className="flex justify-center items-start p-3">
            <Button>{isEdit ? "Edit Item" : "Add Item"}</Button>
          </footer>
        </form>
      </ModalContainer>
    </>
  );
}
