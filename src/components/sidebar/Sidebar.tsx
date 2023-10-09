import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Routes from "../../statics/routes";
import { NavLink } from "react-router-dom";
type Anchor = "left";

export default function Sidebar({ handleDrawerClose, open }: PropsType) {
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      // setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerClose}
      onKeyDown={handleDrawerClose}
    >
      <List>
        {Routes.map((route, index) => (
          <ListItem key={route.route} disablePadding>
            <ListItemButton component={NavLink} to={route.route}>
              <ListItemIcon>
                <route.icon />
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        sx={{ zIndex: 100000 }}
        anchor={"left"}
        open={open}
        onClose={handleDrawerClose}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}

type PropsType = {
  //   theme: Theme;
  open: boolean;
  //   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrawerClose: () => void;
};
