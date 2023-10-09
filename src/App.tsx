// import "./App.scss";
import Layout from "./Layout/Layout";
// import * as colors from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material";

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
    // primary: {
    //   main: "#0091D5",
    // },
    secondary: {
      main: "#EA6A47",
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
      <div className="App">
        <Layout />
      </div>
    </ThemeProvider>
  );
}

export default App;
