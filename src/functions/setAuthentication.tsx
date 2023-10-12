import axios from "axios";
import { setCookie } from "./cookies";

function setAuthentication(token: string) {
  axios.defaults.headers.common.authorization = token;
  setCookie("jwt", token, 2);
}

export default setAuthentication;
