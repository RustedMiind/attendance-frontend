import axios from "axios";
import { Dispatch, Action } from "redux";
import api from "../../statics/api";
import { ApiSuccessfullResponse } from "../../types/ApiResponses";
import { UserStateType, UserType, setUser } from "../reducers/userSlice";

export function requestSetUser(
  dispatch: Dispatch<Action>,
  data: LoginInputsType,
  callbacks: {
    onRun?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
  }
) {
  if (callbacks.onRun) {
    callbacks.onRun();
  }
  return new Promise((resolve, reject) => {
    axios
      .post<ApiSuccessfullResponse<UserType>>(api("user/login"), data)
      .then((res) => {
        dispatch(setUser(res.data.data));
        resolve(res.data);
        if (callbacks.onSuccess) {
          callbacks.onSuccess();
        }
      })
      .catch((err) => {
        reject(err);
        if (callbacks.onError) {
          callbacks.onError();
        }
      });
  });
}

export type LoginInputsType = LoginInputsTypeEmail | LoginInputsTypeUsername;

export type LoginInputsTypeEmail = { email: string; password: string };
export type LoginInputsTypeUsername = { username: string; password: string };
