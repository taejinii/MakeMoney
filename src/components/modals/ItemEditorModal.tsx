import styled from "styled-components";
import customAxios from "../../utils/axios";
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
  console.log(isEdit);
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
    const result = await customAxios.get(`/items/${isEdit?.itemId}`);
    reset(result.data);
  }, [isEdit?.itemId, reset]);

  useEffect(() => {
    if (isEdit?.itemId === 0 || isEdit?.itemId === undefined || !isEdit) {
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
  }, [getOriginData, isEdit, isEdit?.itemId, reset]);

  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    if (!isEdit?.isEdit) {
      customAxios
        .post("/items", {
          ...data,
          isSoldOut: false,
        })
        .then(() => {
          addToast({ type: "success", text: "Successfully saved!" });
          getItem().then((res) => setItems(res));
        });
      dispatch(closeModal());
    } else {
      customAxios.patch(`/items/${isEdit.itemId}`, data).then(() => {
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
              {isEdit?.isEdit ? "Edit Item" : "Add Item"}
            </h2>
            <button type="button" onClick={() => dispatch(closeModal())}>
              x
            </button>
          </header>
          <section className="flex flex-col gap-1 p-3 ">
            <div className="flex items-center justify-center">
              <div>
                <label htmlFor="buyDate">?????????</label>
                <input
                  className="item-editor"
                  id="buyDate"
                  type="date"
                  required
                  {...register("buyDate")}
                />
              </div>
              <div>
                <label htmlFor="buyPlace">?????????</label>
                <input
                  className="item-editor w-full"
                  id="buyPlace"
                  required
                  {...register("buyPlace")}
                />
              </div>
            </div>
            <label htmlFor="productName">?????????</label>
            <input
              className="item-editor"
              id="productName"
              required
              {...register("productName")}
            />
            <div className="flex">
              <div>
                <label htmlFor="size">?????????</label>
                <input
                  className="item-editor"
                  id="size"
                  type="text"
                  {...register("size", {
                    required: "????????? ???????????? ?????? ????????????.",
                  })}
                />
                {errors.size && (
                  <div className="error-msg">{errors.size.message}</div>
                )}
              </div>
              <div>
                <label htmlFor="quantity">??????</label>
                <input
                  className="item-editor"
                  id="quantity"
                  {...register("quantity", {
                    required: "????????? ????????? ?????? ????????????.",
                    pattern: {
                      value: /^[0-9.]*$/,
                      message: "????????? ??????????????????",
                    },
                  })}
                />
                {errors.quantity && (
                  <div className="error-msg">{errors.quantity.message}</div>
                )}
              </div>
            </div>
            <label htmlFor="price">????????????($USD)</label>
            <input
              className="item-editor"
              id="price"
              {...register("price", {
                required: "??????????????? ?????? ????????????.",
                pattern: {
                  value: /^[0-9.]*$/,
                  message: "????????? ??????????????????",
                },
              })}
            />
            {errors.price && (
              <div className="error-msg">{errors.price.message}</div>
            )}
            <label htmlFor="shipExpense">????????? ??????</label>
            <input
              className="item-editor"
              id="shipExpense"
              defaultValue={0}
              {...register("shipExpense", {
                pattern: {
                  value: /^[0-9.]*$/,
                  message: "????????? ??????????????????",
                },
              })}
            />
            {errors.shipExpense && (
              <div className="error-msg">{errors.shipExpense.message}</div>
            )}
            <label htmlFor="sellPrice">?????? ??????</label>
            <input
              className="item-editor"
              id="sellPrice"
              defaultValue={0}
              {...register("sellPrice", {
                pattern: {
                  value: /^[0-9.]*$/,
                  message: "????????? ??????????????????",
                },
              })}
            />
            {errors.sellPrice && (
              <div className="error-msg">{errors.sellPrice.message}</div>
            )}
          </section>
          <footer className="flex justify-center items-start p-3">
            <Button>{isEdit?.isEdit ? "Edit Item" : "Add Item"}</Button>
          </footer>
        </form>
      </ModalContainer>
    </>
  );
}
