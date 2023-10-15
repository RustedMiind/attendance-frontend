import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { PermissionType } from "../../../../types/Permission";
import { CompressedPermissionType } from "../../../../types/CompressedPermission";

function PermissionInput({ permission, addPermission }: PropsType) {
  const [checked, setChecked] = useState(false);

  // test
  const [action, setAction] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    permission.actions.forEach((p, i) => {
      if (p.permissionId === parseInt(event.target.value)) {
        setAction(i);
      }
      addPermission(i);
    });
  };

  return (
    <Stack>
      <Stack direction="row" gap={1} flexWrap={"wrap"} alignItems={"center"}>
        <Switch
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        <Typography
          variant="h6"
          color={checked ? "primary.main" : "text.secondary"}
          sx={{ flexGrow: 1 }}
        >
          {permission.name}
        </Typography>
        <FormControl sx={{ ml: 2, width: "10rem" }}>
          <InputLabel id="demo-simple-select-label" size="small">
            Action
          </InputLabel>
          <Select
            size="small"
            disabled={!checked}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={
              checked
                ? permission.actions[action].permissionId.toString()
                : (0).toString()
            }
            label="Action"
            onChange={handleChange}
            defaultValue={permission.actions[0].name}
          >
            {permission.actions.map((a) => (
              <MenuItem value={a.permissionId}>{a.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Divider sx={{ my: 1 }} orientation="horizontal"></Divider>
    </Stack>
  );
}

type PropsType = {
  permission: CompressedPermissionType;
  addPermission: (x: number) => void;
};

export default PermissionInput;
