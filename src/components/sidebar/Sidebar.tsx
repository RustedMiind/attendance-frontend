import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Routes from "../../statics/routes";
import { NavLink } from "react-router-dom";
type Anchor = "left";

export default function Sidebar({ handleDrawerClose, open }: PropsType) {
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
