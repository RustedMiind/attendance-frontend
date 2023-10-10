import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import RoleCard from "./RoleCard";
import { RoleType } from "../../../types/Role";

function RolesContainer(props: PropsType) {
  console.log("props :", props);
  return (
    <Stack direction="row" flexWrap="wrap" id="roles-container">
      {props.roles.map((role) => (
        <RoleCard
          name={role.name}
          accesses={role.accesses.map((access) => access.name)}
          id={role.id}
        />
      ))}
    </Stack>
  );
}
type PropsType = {
  roles: RoleType[];
};

export default RolesContainer;
