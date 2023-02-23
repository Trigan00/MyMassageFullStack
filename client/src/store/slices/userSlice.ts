import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string | null;
  email: string | null;
  id: string | null;
  role: string | null;
  isVerified: boolean | null;
  token: string | null;
}

interface UserAction {
  username: string | null;
  email: string | null;
  id: string | null;
  role: string | null;
  isVerified: boolean | null;
  token: string | null;
}

const initialState: UserState = {
  username: null,
  email: null,
  id: null,
  role: null,
  isVerified: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserAction>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.isVerified = action.payload.isVerified;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.role = null;
      state.isVerified = null;
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
