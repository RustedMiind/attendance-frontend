import { getCookie } from "./cookies";

function OnPageLoad() {
  const jwt = getCookie("jwt");
  if (jwt) {
    // check user token function
    console.log(jwt);
  } else {
    console.log("Not a user");
  }
}

export default OnPageLoad;
