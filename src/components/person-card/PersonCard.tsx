import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CardActions from "@mui/material/CardActions";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export default function PersonCard({ user, width }: PropsType) {
  const isPlaceholder = user === "placeholder";
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const open = Boolean(settingsAnchorEl);
  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };
  return (
    <Card sx={{ width: width || 345, transition: "400ms" }}>
      <Box
        sx={{
          display: "flex",
          height: "150px",
          alignItems: "center",
          justifyContent: "center",
          direction: "column",
        }}
      >
        <Avatar
          sx={{ width: 120, height: 120 }}
          {...(isPlaceholder
            ? {
                children: (
                  <Skeleton variant="circular" width={"100%"} height={"100%"} />
                ),
              }
            : {
                src: user.image,
              })}
        ></Avatar>
      </Box>
      <CardHeader
        action={
          <>
            {!isPlaceholder && (
              <IconButton onClick={handleSettingsClick} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              id="basic-menu"
              anchorEl={settingsAnchorEl}
              open={open}
              onClose={handleSettingsClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleSettingsClose}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText>Assign Task</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleSettingsClose}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>Update</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={handleSettingsClose}
                sx={{
                  "*": {
                    color: "error.main",
                  },
                }}
              >
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
        title={
          isPlaceholder ? (
            <Skeleton />
          ) : (
            <Typography variant="h5">{user.name}</Typography>
          )
        }
        subheader={
          isPlaceholder ? (
            <Skeleton />
          ) : (
            <Typography color={"secondary.main"} variant="body1">
              {user.title}
            </Typography>
          )
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: 80, overflowY: "auto" }}
        >
          {isPlaceholder ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            user.description
          )}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {isPlaceholder ? (
          <Skeleton height={"40px"} width={"50%"} />
        ) : (
          <Button
            component={NavLink}
            color="secondary"
            to={`/users/${isPlaceholder ? <Skeleton /> : user.id}`}
          >
            View Profile
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

type PropsType = {
  user: CardUserType | "placeholder";
  width?: number;
};

export type CardUserType = {
  name: string;
  title: string;
  description: string;
  id: number;
  image?: string;
};
