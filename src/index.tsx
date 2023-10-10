import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import OnPageLoad from "./functions/onPageLoad";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
OnPageLoad();
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
