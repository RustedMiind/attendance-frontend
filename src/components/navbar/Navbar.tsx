import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Toolbar, IconButton, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/store";
import LoginDialog from "../login-dialog/LoginDialog";
import { useState } from "react";

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
  const user = useSelector((state: StateType) => state.user);
  const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const handleCloseLoginDrawer = () => {
    setLoginDrawerOpen(false);
  };
  const handleOpenLoginDrawer = () => {
    setLoginDrawerOpen(true);
  };
  return (
    <>
      <AppBar position="fixed" open={open} elevation={2} color="default">
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
          {user.isUser ? (
            <UserAvatar />
          ) : (
            <Button
              color={"secondary"}
              onClick={handleOpenLoginDrawer}
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginDialog isOpen={loginDrawerOpen} close={handleCloseLoginDrawer} />
    </>
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
