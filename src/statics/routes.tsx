import HomeIcon from "@mui/icons-material/Home";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import HowToRegIcon from "@mui/icons-material/HowToReg";
import AssignmentIcon from "@mui/icons-material/Assignment";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Routes: RoutesListType = [
  {
    name: "Home",
    route: "/",
    icon: HomeIcon,
  },
  {
    name: "Employees",
    route: "/employees",
    icon: RecentActorsIcon,
  },
  {
    name: "Assignments",
    route: "/assignments",
    icon: AssignmentIcon,
  },
];

export default Routes;

type RoutesListType = {
  name: string;
  route: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}[];
