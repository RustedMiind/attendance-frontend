import { Stack } from "@mui/material";
import RoleCard from "./RoleCard";

function RolesPlaceholder() {
  return (
    <Stack direction="row" flexWrap="wrap" id="roles-container">
      <RoleCard placeholder />
      <RoleCard placeholder />
      <RoleCard placeholder />
      <RoleCard placeholder />
      <RoleCard placeholder />
      <RoleCard placeholder />
      <RoleCard placeholder />
    </Stack>
  );
}

export default RolesPlaceholder;
