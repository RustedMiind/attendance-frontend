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
import { CompressedPermissionTypeWithSelect } from "../../../../types/CompressedPermission";

function PermissionInput(props: PropsType) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    console.log("old permissions", props.permission);
    props.setSelect(parseInt(event.target.value));
    console.log("new permissions", props.permission);
  };

  const currentSelect = (
    props.select || props.permission.actions[0].permissionId
  ).toString();

  console.log(props.select);

  return (
    <Stack>
      <Stack direction="row" gap={1} flexWrap={"wrap"} alignItems={"center"}>
        <Switch
          checked={checked}
          color={props.isError ? "error" : undefined}
          disabled={props.isLoading}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        <Typography
          variant="h6"
          color={
            checked
              ? props.isError
                ? "error.main"
                : "primary.main"
              : "text.secondary"
          }
          sx={{ flexGrow: 1 }}
        >
          {props.permission.name}
        </Typography>
        <FormControl
          sx={{
            ml: 2,
            width: "10rem",
            transition: "150ms",
            ...(checked ? undefined : { opacity: 0, pointerEvents: "none" }),
          }}
          error={props.isError}
        >
          <InputLabel id="demo-simple-select-label" size="small">
            Action
          </InputLabel>
          <Select
            size="small"
            disabled={!checked || props.isLoading}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentSelect}
            label="Action"
            onChange={handleChange}
          >
            {props.permission.actions.map((a) => (
              <MenuItem key={a.permissionId} value={a.permissionId.toString()}>
                {a.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Divider sx={{ my: 1 }} orientation="horizontal"></Divider>
    </Stack>
  );
}

type PropsType = {
  permission: CompressedPermissionTypeWithSelect;
  setSelect: (permissionId: number) => void;
  select: number | undefined;
  isLoading?: boolean;
  isError?: boolean;
};

export default PermissionInput;
