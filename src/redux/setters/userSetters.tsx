import axios from "axios";
import { Dispatch, Action } from "redux";
import api from "../../statics/api";
import { ApiSuccessfullResponse } from "../../types/ApiResponses";
import { UserStateType, UserType, setUser } from "../reducers/userSlice";

export function requestSetUser(
  dispatch: Dispatch<Action>,
  data: LoginInputsType,
  onRun?: () => void
) {
  if (onRun) {
    onRun();
  }
  return new Promise((resolve, reject) => {
    axios
      .post<ApiSuccessfullResponse<UserType>>(api("user/login"), data)
      .then((res) => {
        dispatch(setUser(res.data.data));
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export type LoginInputsType = LoginInputsTypeEmail | LoginInputsTypeUsername;

export type LoginInputsTypeEmail = { email: string; password: string };
export type LoginInputsTypeUsername = { username: string; password: string };
