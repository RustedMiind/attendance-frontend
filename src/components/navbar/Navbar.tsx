import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Toolbar, IconButton, Typography } from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { drawerWidth } from "../../Layout/Layout";
import { NavLink, NavLinkProps } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import UserAvatar from "./UserAvatar";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function Navbar({ open, handleDrawerOpen }: PropsType) {
  return (
    <AppBar position="fixed" open={open} elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            transition: "200ms",
            // marginRight: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* <IconButton component={NavLink} to="/" size="large">
          <HomeIcon fontSize="medium" sx={{ color: "primary.contrastText" }} />
        </IconButton> */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ marginLeft: 1, flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}

type PropsType = {
  open: boolean;
  handleDrawerOpen: () => void;
};
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
export default Navbar;
