import { createSlice } from "@reduxjs/toolkit";

export type UserRole = "ADMIN" | "BUYER";

export interface UserData {
  name: string;
  email: string;
  role: UserRole;
}

export interface UserState {
  value: {
    data: null | UserData;
  };
}

const initialState: UserState = {
  value: {
    data: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: { payload: UserData }) => {
      state.value.data = action.payload;
    },
    logout: (state) => {
      state.value.data = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
