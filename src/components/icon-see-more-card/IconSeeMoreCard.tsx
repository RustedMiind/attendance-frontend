import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

export default function IconSeeMoreCard(props: PropsType) {
  return (
    <Card
      sx={{
        display: "inline-block",
        transition: "400ms",
        width: props.width || 345,
      }}
    >
      <CardContent sx={{ flexDirection: "row" }}>
        <Grid container>
          <Grid item xs={2}>
            <Avatar sx={{ backgroundColor: props.iconColor }}>
              <IconButton
                {...(props.redirect && {
                  component: NavLink,
                  to: props.redirect,
                })}
                size="medium"
                sx={{ color: "white" }}
              >
                {<props.icon />}
              </IconButton>
            </Avatar>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {props.title}
            </Typography>
            <Typography variant="h6" component="div">
              {props.value}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {props.redirect && (
        <CardActions>
          <Button
            variant="text"
            color="secondary"
            size="small"
            endIcon={<NavigateNextIcon />}
            component={NavLink}
            to={props.redirect}
          >
            View Details
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

type PropsType = {
  iconColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | string;
  title: string;
  value: string;
  width?: number;
  redirect?: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
};
