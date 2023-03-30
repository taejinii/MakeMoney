import { createSlice } from "@reduxjs/toolkit";

interface LoginTypes {
  isLogin: boolean;
}

const initialState: LoginTypes = {
  isLogin: false,
};

const losinSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = losinSlice.actions;
export default losinSlice.reducer;
