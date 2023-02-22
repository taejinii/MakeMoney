import styled from "styled-components";
import ModalBack from "./ModalBack";
import { closeModal } from "../../store/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/store";
interface VisibleType {
  visible: boolean;
}

const ModalContainer = styled.div<VisibleType>`
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
  console.log(isOpen);
  return (
    <>
      {isOpen && <ModalBack />}
      <ModalContainer visible={isOpen}>
        <button onClick={() => dispatch(closeModal())}>x</button>
      </ModalContainer>
    </>
  );
}
