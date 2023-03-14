import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import ExchangeModal from "./ExchangeModal";
import ItemEditorModal from "./ItemEditorModal";

export default function GlobalModal({ setItems }: any) {
  const MODAL_TYPES = {
    ItemModal: "ItemModal",
    CurrencyModal: "CurrencyModal",
  };
  const MODAL_COMPONENTS = [
    {
      type: MODAL_TYPES.ItemModal,
      component: <ItemEditorModal setItems={setItems} />,
    },
    { type: MODAL_TYPES.CurrencyModal, component: <ExchangeModal /> },
  ];
  const { modalType, isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });
  const renderModal = () => {
    return findModal?.component;
  };
  return <>{isOpen && renderModal()}</>;
}
