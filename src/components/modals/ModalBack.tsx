import styled from "styled-components";

const ModalBackDrop = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
`;

export default function ModalBack() {
  return <ModalBackDrop></ModalBackDrop>;
}
