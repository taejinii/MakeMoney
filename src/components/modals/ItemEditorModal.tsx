import styled from "styled-components";
import axios from "axios";
import useModalClose from "../../hooks/useModalClose";
import Button from "../Button";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import useToast from "../../hooks/useToast";
import { getItem } from "../../utils/api";
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
  width: 100vw;
  height: 100vh;
`;

export const ModalContainer = styled.div<VisibleType>`
  position: fixed;
  scale: ${(props) => (props.visible ? "1" : "0")};
  transition: 0.2s ease-out;
  flex-direction: column;
  width: 400px;
  height: 630px;
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
interface SetItems {
  setItems: React.Dispatch<React.SetStateAction<any>>;
}
export default function ItemEditorModal({ setItems }: SetItems) {
  const { isOpen, isEdit } = useAppSelector((state) => state.modal);
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  const ref = useModalClose(isOpen, closeModal());
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const getOriginData = useCallback(async () => {
    const result = await axios.get(
      `http://localhost:3001/items/${isEdit.itemId}`
    );
    reset(result.data);
  }, [isEdit.itemId, reset]);

  useEffect(() => {
    if (isEdit.itemId === 0 || isEdit.itemId === undefined || !isEdit) {
      reset({
        productName: "",
        buyPlace: "",
        size: "",
        buyDate: "",
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

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    if (!isEdit) {
      axios
        .post("http://localhost:3001/items", {
          ...data,
          isSoldOut: false,
        })
        .then(() => {
          addToast({ type: "success", text: "Successfully saved!" });
          getItem().then((res) => setItems(res));
        });
      dispatch(closeModal());

      //인벤토리테이블 컴포넌트에서 이 컴포넌트를 사용한다음 props로 setState함수를 넘겨줘서 여기서 갱신해야할듯 data를 다시 불러오는 함수를 불러야함.
    } else {
      axios
        .patch(`http://localhost:3001/items/${isEdit.itemId}`, data)
        .then(() => {
          addToast({ type: "success", text: "Successfully edited!" });
          getItem().then((res) => setItems(res));
        });
      dispatch(closeModal());
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
            <button type="button" onClick={() => dispatch(closeModal())}>
              x
            </button>
          </header>
          <section className="flex flex-col gap-1 p-3 ">
            <div className="flex items-center justify-center">
              <div>
                <label htmlFor="buyDate">구매일</label>
                <input
                  className="item-editor"
                  id="buyDate"
                  type="date"
                  required
                  {...register("buyDate")}
                />
              </div>
              <div>
                <label htmlFor="buyPlace">구매처</label>
                <input
                  className="item-editor w-full"
                  id="buyPlace"
                  required
                  {...register("buyPlace")}
                />
              </div>
            </div>
            <label htmlFor="productName">제품명</label>
            <input
              className="item-editor"
              id="productName"
              required
              {...register("productName")}
            />
            <div className="flex">
              <div>
                <label htmlFor="size">사이즈</label>
                <input
                  className="item-editor"
                  id="size"
                  type="text"
                  {...register("size", {
                    required: "정확한 사이즈를 입력 해주세요.",
                  })}
                />
                {errors.size && (
                  <div className="error-msg">{errors.size.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="quantity">수량</label>
                <input
                  className="item-editor"
                  id="quantity"
                  {...register("quantity", {
                    required: "정확한 수량을 입력 해주세요.",
                    pattern: {
                      value: /^[0-9.]*$/,
                      message: "숫자를 입력해주세요",
                    },
                  })}
                />
                {errors.quantity && (
                  <div className="error-msg">{errors.quantity.message}</div>
                )}
              </div>
            </div>
            <label htmlFor="price">구매금액($USD)</label>
            <input
              className="item-editor"
              id="price"
              {...register("price", {
                required: "구매금액을 입력 해주세요.",
                pattern: {
                  value: /^[0-9.]*$/,
                  message: "숫자를 입력해주세요",
                },
              })}
            />
            {errors.price && (
              <div className="error-msg">{errors.price.message}</div>
            )}
            <label htmlFor="shipExpense">배대지 비용</label>
            <input
              className="item-editor"
              id="shipExpense"
              defaultValue={0}
              {...register("shipExpense", {
                pattern: {
                  value: /^[0-9.]*$/,
                  message: "숫자를 입력해주세요",
                },
              })}
            />
            {errors.shipExpense && (
              <div className="error-msg">{errors.shipExpense.message}</div>
            )}
            <label htmlFor="sellPrice">판매 가격</label>
            <input
              className="item-editor"
              id="sellPrice"
              defaultValue={0}
              {...register("sellPrice", {
                pattern: {
                  value: /^[0-9.]*$/,
                  message: "숫자를 입력해주세요",
                },
              })}
            />
            {errors.sellPrice && (
              <div className="error-msg">{errors.sellPrice.message}</div>
            )}
          </section>
          <footer className="flex justify-center items-start p-3">
            <Button>{isEdit ? "Edit Item" : "Add Item"}</Button>
          </footer>
        </form>
      </ModalContainer>
    </>
  );
}
