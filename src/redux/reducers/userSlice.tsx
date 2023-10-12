import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

export type UserStateType = UserType;

export const initialUser: UserStateType = { isUser: false, status: "loading" };

const initialState: UserType = initialUser;
export const settingsSlice = createSlice<
  UserStateType,
  SliceCaseReducers<UserStateType>
>({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: UserData }) => {
      return { ...action.payload, isUser: true, status: "logged_in" };
    },
    setNotUser: () => {
      return { isUser: false, status: "error" };
    },
    setUserLoading: () => {
      return { isUser: false, status: "loading" };
    },
  },
});

export type UserType =
  | { isUser: false; status: "loading" | "error" }
  | UserTrueType;

interface UserTrueType extends UserData {
  isUser: true;
  status: "logged_in";
}
export interface UserData {
  id: string;
  email: string;
  name: string;
  username: string;
  roleId: string;
}
export const { setUser, setNotUser, setUserLoading } = settingsSlice.actions;
export default settingsSlice.reducer;
