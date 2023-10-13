import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { Dispatch, Action } from "redux";
import api from "../../statics/api";
import {
  ApiErrorResponse,
  ApiSuccessfullResponse,
} from "../../types/ApiResponses";
import {
  UserStateType,
  UserType,
  setNotUser,
  setUser,
} from "../reducers/userSlice";
import { setCookie } from "../../functions/cookies";
import setAuthentication from "../../functions/setAuthentication";

export function requestSetUser(
  dispatch: Dispatch<Action>,
  data: LoginInputsType,
  onRun?: () => void
) {
  if (onRun) {
    onRun();
  }
  return new Promise<
    AxiosResponse<{ data: { user: UserType }; message: string }>
  >((resolve, reject) => {
    axios
      .post<ApiSuccessfullResponse<{ token: string; user: UserType }>>(
        api("user/login"),
        data
      )
      .then((res) => {
        dispatch(setUser(res.data.data));
        setAuthentication(res.data.data.token);
        resolve(res);
      })
      .catch((err) => {
        requestUserLogout(dispatch);
        reject(err);
      });
  });
}

export function requestCheckUser(dispatch: Dispatch<Action>) {
  return new Promise<AxiosResponse<{ data: UserType; message: string }>>(
    (resolve, reject) => {
      axios
        .get<ApiSuccessfullResponse<UserType>>(api("user/check"))
        .then((res) => {
          dispatch(setUser(res.data.data));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  );
}
export function requestUserLogout(dispatch: Dispatch<Action>) {
  return new Promise((resolve, reject) => {
    setCookie("jwt", "", 0.00001);
    dispatch(setNotUser({}));
    resolve("Set Successfully");
  });
}

export type LoginInputsType = LoginInputsTypeEmail | LoginInputsTypeUsername;

export type LoginInputsTypeEmail = { email: string; password: string };
export type LoginInputsTypeUsername = { username: string; password: string };
