import axios from "axios";
import { getCookie } from "./cookies";
import { Action, Dispatch, AnyAction } from "redux";
import { requestCheckUser } from "../redux/setters/userSetters";

function OnPageLoad(dispatch: Dispatch<Action>) {
  const jwt = getCookie("jwt");
  if (jwt) {
    axios.defaults.headers.common.authorization = jwt;
    requestCheckUser(dispatch);
    console.log(jwt);
  } else {
    console.log("Not a user");
  }
}

export default OnPageLoad;
