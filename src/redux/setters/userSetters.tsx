import axios from "axios";
import { Dispatch, Action } from "redux";
import api from "../../statics/api";
import { ApiSuccessfullResponse } from "../../types/ApiResponses";
import { UserStateType, UserType, setUser } from "../reducers/userSlice";

export function requestSetUser(
  dispatch: Dispatch<Action>,
  onRunCallback?: () => void,
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void
) {
  if (onRunCallback) {
    onRunCallback();
  }
  return new Promise((resolve, reject) => {
    axios
      .post<ApiSuccessfullResponse<UserType>>(api("client/setting"))
      .then((res) => {
        dispatch(setUser(res.data.data));
        resolve(res.data);
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      })
      .catch((err) => {
        reject(err);
        if (onErrorCallback) {
          onErrorCallback();
        }
      });
  });
}
