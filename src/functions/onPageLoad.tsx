import axios from "axios";
import { getCookie } from "./cookies";
import { Dispatch, AnyAction } from "redux";
import {
  requestCheckUser,
  requestUserLogout,
} from "../redux/setters/userSetters";
import { NavigateFunction } from "react-router-dom";
function OnPageLoad(dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) {
  const jwt = getCookie("jwt");
  if (jwt) {
    axios.defaults.headers.common.authorization = jwt;
    requestCheckUser(dispatch);
    // navigate("/");
    console.log(jwt);
  } else {
    requestUserLogout(dispatch);
    console.log("Not a user");
  }
}

export default OnPageLoad;
