import styled from "styled-components";
import useModalClose from "../../hooks/useModalClose";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";

interface VisibleType {
  visible: boolean;
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
  width: 350px;
  height: 550px;
  background-color: blue;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  z-index: 20;
`;

export default function AddItemModal() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modal);
  const ref = useModalClose(isOpen, closeModal());
  console.log(isOpen);
  return (
    <>
      {isOpen && <ModalBackDrop ref={ref} />}
      <ModalContainer visible={isOpen}>
        <button onClick={() => dispatch(closeModal())}>x</button>
      </ModalContainer>
    </>
  );
}
