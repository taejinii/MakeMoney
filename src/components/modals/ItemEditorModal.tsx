import styled from "styled-components";
import customAxios from "../../utils/axios";
import useModalClose from "../../hooks/useModalClose";
import Button from "../common/Button";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useCallback, useEffect } from "react";
import useToast from "../../hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem } from "../../utils/api";
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
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
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

export default function ItemEditorModal() {
  const { isOpen, isEdit } = useAppSelector((state) => state.modal);
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  const ref = useModalClose(isOpen);
  console.log(isEdit?.itemId);
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
  const queryClient = useQueryClient();
  const add = useMutation(
    (data) => {
      return addItem(data);
    },
    {
      onSuccess: () => {
        addToast({ type: "success", text: "Successfully saved!" });
        queryClient.invalidateQueries(["items"]);
      },
      onError: () => {
        addToast({ type: "error", text: "An unexpected error occured" });
      },
    }
  );
  const update = useMutation(
    (data) => {
      return customAxios.patch(`items/${isEdit?.itemId}`, data);
    },
    {
      onSuccess: () => {
        addToast({ type: "success", text: "Successfully edited!" });
        queryClient.invalidateQueries(["items"]);
      },
    }
  );
  console.log(errors);
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    console.log(data);
    if (!isEdit?.isEdit) {
      add.mutate(data);

      dispatch(closeModal());
    } else {
      update.mutate(data);
      dispatch(closeModal());
    }
  };
  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      <ModalContainer
        visible={isOpen}
        className="dark:bg-[#363a44] dark:text-white font-semibold"
      >
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
                    valueAsNumber: true,
                    validate: (value) => value > 0,
                  })}
                />
                {errors.quantity && (
                  <div className="error-msg">
                    최소 1개이상 숫자로 입력해주세요.
                  </div>
                )}
              </div>
            </div>
            <label htmlFor="price">구매금액($USD)</label>
            <input
              className="item-editor"
              id="price"
              {...register("price", {
                required: "구매금액을 입력 해주세요.",
                valueAsNumber: true,
                validate: (value) => value >= 0,
              })}
            />
            {errors.price && (
              <div className="error-msg">다시 입력해주세요.</div>
            )}
            <label htmlFor="shipExpense">배대지 비용</label>
            <input
              className="item-editor"
              id="shipExpense"
              defaultValue={0}
              {...register("shipExpense", {
                valueAsNumber: true,
                validate: (value) => value >= 0,
              })}
            />
            {errors.shipExpense && (
              <div className="error-msg">다시 입력해주세요.</div>
            )}
            <label htmlFor="sellPrice">판매 가격</label>
            <input
              className="item-editor"
              id="sellPrice"
              defaultValue={0}
              {...register("sellPrice", {
                valueAsNumber: true,
                validate: (value) => value >= 0,
              })}
            />
            {errors.sellPrice && (
              <div className="error-msg">다시 입력해주세요.</div>
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
