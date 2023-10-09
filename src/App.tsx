// import "./App.scss";
import { Provider } from "react-redux";
import Layout from "./Layout/Layout";
// import * as colors from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material";
import { store } from "./redux/store";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: blueGrey[900],
  //   },
  //   secondary: {
  //     main: pink[500],
  //   },
  //   background: {
  //     paper: grey[100],
  //     default: grey[300],
  //   },
  // },
  palette: {
    primary: {
      main: "#EA6A47",
    },

    secondary: {
      main: "#216869",
      // main: colors.deepOrange[500],
    },
    background: {
      paper: "#FFFFFF",
      default: "#F1F1F1",
    },
    // text: {
    //   primary: "#444850",
    // },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
