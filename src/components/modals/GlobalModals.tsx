import ExchangeModal from "./ExchangeModal";
import ItemEditorModal from "./ItemEditorModal";
import React from "react";
import { useAppSelector } from "../../store/store";

const MODAL_TYPES = {
  ItemModal: "ItemModal",
  ExchangeModal: "ExchangeModal",
};
const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.ItemModal,
    component: <ItemEditorModal />,
  },
  {
    type: MODAL_TYPES.ExchangeModal,
    component: <ExchangeModal />,
  },
];
export default function GlobalModals() {
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal?.component;
  };
  return <>{renderModal()}</>;
}
