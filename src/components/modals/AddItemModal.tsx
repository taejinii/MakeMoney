import styled from "styled-components";
import axios from "axios";
import useModalClose from "../../hooks/useModalClose";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { useForm, SubmitHandler } from "react-hook-form";

interface VisibleType {
  visible: boolean;
}

interface IFormInput {
  buyDate: string;
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
`;

export default function AddItemModal() {
  const { isOpen } = useAppSelector((state) => state.modal);
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const dispatch = useAppDispatch();
  const ref = useModalClose(isOpen, closeModal());

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data) {
      axios.post("http://localhost:3001/items", data);
      dispatch(closeModal());
      reset();
    }
    return;
  };

  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      <ModalContainer visible={isOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="flex justify-between items-center border-b-2 p-4">
            <h2 className="text-xl font-semibold">Add Item</h2>
            <button onClick={() => dispatch(closeModal())}>x</button>
          </header>
          <section className="flex flex-col gap-1 mt-2">
            <span>구매일</span>
            <input className="border-2" {...register("buyDate")} />
            <span>구매처</span>
            <input className="border-2" {...register("buyPlace")} />
            <span>사이즈</span>
            <input className="border-2" {...register("size")} />
            <span>제품명</span>
            <input className="border-2" {...register("productName")} />
            <span>수량</span>
            <input
              className="border-2"
              {...register("quantity", {
                valueAsNumber: true,
              })}
            />
            <span>구매금액</span>
            <input
              className="border-2"
              {...register("price", {
                valueAsNumber: true,
              })}
            />
            <span>배대지 비용</span>
            <input
              className="border-2"
              {...register("shipExpense", {
                valueAsNumber: true,
              })}
            />
            <span>판매 가격</span>
            <input
              className="border-2"
              {...register("sellPrice", {
                valueAsNumber: true,
              })}
            />
          </section>
          <footer className="flex justify-center items-start">
            <button>Add Item</button>
          </footer>
        </form>
      </ModalContainer>
    </>
  );
}
