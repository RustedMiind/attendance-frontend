import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import PermissionInput from "./PermissionInput";
import axios from "axios";
import api from "../../../../statics/api";
import { ApiSuccessfullResponse } from "../../../../types/ApiResponses";
import { PermissionType } from "../../../../types/Permission";
import {
  CompressedPermissionType,
  CompressedPermissionTypeWithSelect,
} from "../../../../types/CompressedPermission";
import { LoadingButton } from "@mui/lab";
import { RoleType } from "../../../../types/Role";

export default function CreateNewRoleDialog(props: PropsType) {
  const handleClose = props.close;
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState<"none" | "loading" | "error">(
    "none"
  );
  const isLoading = status === "loading";
  const isError = status === "error";
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function ResetDialog() {}
  let [permissions, setPermissions] = React.useState<
    null | CompressedPermissionTypeWithSelect[]
  >(null);

  React.useEffect(() => {
    if (props.open) {
      setPermissions(null);
      setName("");
      setStatus("none");
      setTimeout(() => {
        axios
          .get<
            ApiSuccessfullResponse<{
              permissions: PermissionType[];
              compressedPermissions: CompressedPermissionType[];
            }>
          >(api("permission/togive"))
          .then((res) => {
            setPermissions(res.data.data.compressedPermissions);
            console.log(res.data.data);
          });
      }, 800);
    }
  }, [props.open]);

  function setSelectGenerator(permissionIndex: number) {
    return function (actionId: number) {
      if (permissions) {
        permissions[permissionIndex].select = actionId;
        setPermissions([...permissions]);
      } else {
        console.log("permissions : ", typeof permissions);
      }
    };
  }

  function submitHandler(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    setStatus("loading");
    const statePermisions = permissions;
    setTimeout(() => {
      if (statePermisions) {
        let body: { name: string; permissions: number[] } = {
          name,
          permissions: statePermisions
            .filter((p) => !!p.select)
            .map((p) => p.select) as number[],
        };
        if (body.permissions.length) {
          console.log("body", body);
          axios
            .post<ApiSuccessfullResponse<RoleType[]>>(api("role/new"), {
              name: body.name,
              permissions: body.permissions,
            })
            .then((res) => {
              console.log("update Roles", res);
              setStatus("none");
              props.setRoles(res.data.data);
              props.close();
            })
            .catch((err) => {
              console.log(err);
              setStatus("error");
            });
        } else {
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    }, 1500);
  }

  return (
    <Dialog
      component={"form"}
      maxWidth="md"
      fullWidth
      open={props.open}
      onClose={handleClose}
      onSubmit={submitHandler}
    >
      <DialogTitle>Create New Role</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You Can Only create role if you have role write permission and you can
          only give permissions you have or permissions below
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Role Name"
          type="text"
          variant="outlined"
          fullWidth
          value={name}
          disabled={isLoading}
          onChange={handleNameChange}
          error={isError}
          helperText={isError ? "An error occured" : undefined}
        />
        <Stack my={2}>
          {permissions?.map((permission, i) => (
            <PermissionInput
              key={permission.name}
              permission={permission}
              setSelect={setSelectGenerator(i)}
              select={permission.select}
              isLoading={isLoading}
              isError={isError}
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          color={isError ? "error" : undefined}
          disabled={isLoading}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          // onClick={extractRoleData}
          type="submit"
          color={isError ? "error" : undefined}
        >
          Create Role
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  close: () => void;
  setRoles: (roles: RoleType[]) => void;
};
