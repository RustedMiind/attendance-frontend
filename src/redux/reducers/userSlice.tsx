import { SliceCaseReducers, createSlice } from "@reduxjs/toolkit";

export type UserStateType = UserType;

export const initialUser: UserStateType = { isUser: false };

const initialState: UserType = initialUser;
export const settingsSlice = createSlice<
  UserStateType,
  SliceCaseReducers<UserStateType>
>({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: { payload: UserData }) => {
      return { ...action.payload, isUser: true };
    },
  },
});

export type UserType = { isUser: false } | UserTrueType;

interface UserTrueType extends UserData {
  isUser: true;
}
export interface UserData {
  id: string;
  email: string;
  name: string;
  username: string;
  roleId: string;
}
export const { setUser } = settingsSlice.actions;
export default settingsSlice.reducer;
