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
    loginAction: (state) => {
      state.isLogin = true;
    },
    logoutAction: (state) => {
      state.isLogin = false;
      localStorage.clear();
    },
  },
});

export const { loginAction, logoutAction } = losinSlice.actions;
export default losinSlice.reducer;
