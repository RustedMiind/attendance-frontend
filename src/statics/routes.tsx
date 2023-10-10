import HomeIcon from "@mui/icons-material/Home";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

const Routes: RoutesListType = [
  {
    name: "Home",
    route: "/",
    icon: HomeIcon,
  },
  {
    name: "Roles",
    route: "/roles",
    icon: RecentActorsIcon,
  },
];

export default Routes;

type RoutesListType = {
  name: string;
  route: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}[];
