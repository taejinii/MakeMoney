import ExchangeModal from "./ExchangeModal";
import ItemEditorModal from "./ItemEditorModal";
import ProfileEditModal from "./ProfileEditModal";
import MobileMenuModal from "./MobileMenuModal";
import React from "react";
import { useAppSelector } from "../../store/store";

const MODAL_TYPES = {
  ItemModal: "ItemModal",
  ExchangeModal: "ExchangeModal",
  ProfileEditModal: "ProfileEditModal",
  MobileMenuModal: "MobileMenuModal",
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
  {
    type: MODAL_TYPES.ProfileEditModal,
    component: <ProfileEditModal />,
  },
  {
    type: MODAL_TYPES.MobileMenuModal,
    component: <MobileMenuModal />,
  },
];
export default function GlobalModals() {
  const { modalType } = useAppSelector((state) => state.modal);
  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal?.component;
  };
  return <>{renderModal()}</>;
}
