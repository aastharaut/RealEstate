import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    data: null | {
      name: string;
      email: string;
      role: boolean;
    };
  };
}

const initialState: UserState = {
  value: {
    data: null, // logged out
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      //   console.log(action.type);
      //   console.log(action.payload);
      state.value.data = action.payload;
    },
    logout: (state) => {
      state.value.data = null;
      localStorage.removeItem("accessToken");
      //   localStorage.clear();
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
