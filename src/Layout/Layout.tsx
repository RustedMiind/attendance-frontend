import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import OnPageLoad from "../functions/onPageLoad";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const drawerWidth = 220;
export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

function Layout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    OnPageLoad(dispatch, navigate);
  }, []);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box className="page-content" id="main" sx={{ width: "100%" }}>
          <AppRoutes />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
