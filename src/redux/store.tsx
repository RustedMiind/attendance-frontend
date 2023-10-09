import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserStateType } from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type StateType = {
  user: UserStateType;
};
