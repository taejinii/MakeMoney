import { createSlice } from "@reduxjs/toolkit";

interface ModalTypes {
  isOpen: boolean;
  isEdit: {
    isEdit: boolean;
    itemId: number;
  };
}

const initialState: ModalTypes = {
  isOpen: false,
  isEdit: {
    isEdit: false,
    itemId: 0,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.isEdit = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
