import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Snackbar, Stack } from "@mui/material";
import PermissionInput from "./PermissionInput";
import axios from "axios";
import api from "../../../../statics/api";
import {
  ApiErrorResponse,
  ApiSuccessfullResponse,
} from "../../../../types/ApiResponses";
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
  const [status, setStatus] = React.useState<
    "none" | "loading" | "error" | "success"
  >("none");

  const [error, setError] = React.useState<null | string>(null);
  const isLoading = status === "loading",
    isError = status === "error",
    isSuccess = status === "success";
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function ResetDialog() {
    setError(null);
    setPermissions(null);
    setName("");
    setStatus("none");
  }
  let [permissions, setPermissions] = React.useState<
    null | CompressedPermissionTypeWithSelect[]
  >(null);

  React.useEffect(() => {
    if (props.open) {
      ResetDialog();
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
          })
          .catch((err: ApiErrorResponse<any>) => {
            setError(err.response.data.message);
          });
      }, 800);
    }
  }, [props.open]);

  function setSelectGenerate(permissionIndex: number) {
    return function (actionId: number) {
      if (permissions) {
        permissions[permissionIndex].select = actionId;
        setPermissions([...permissions]);
      } else {
        console.log("permissions : ", typeof permissions);
      }
    };
  }

  return (
    <>
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
            You Can Only create role if you have role write permission and you
            can only give permissions you have or permissions below
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
            helperText={error}
          />
          <Stack my={2}>
            {permissions?.map((permission, i) => (
              <PermissionInput
                key={permission.name}
                permission={permission}
                setSelect={setSelectGenerate(i)}
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
      <Snackbar
        open={status === "success" || status === "error"}
        autoHideDuration={6000}
        onClose={() => {
          setStatus("none");
        }}
      >
        <Alert
          onClose={() => {
            setStatus("none");
          }}
          severity={isError ? "error" : isSuccess ? "success" : undefined}
          sx={{ width: "100%" }}
        >
          {isError ? error : "Role has been created successfully"}
        </Alert>
      </Snackbar>
    </>
  );
  // Submit Handler
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
              setStatus("success");
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
  // End Submit Handler
}

type PropsType = {
  open: boolean;
  close: () => void;
  setRoles: (roles: RoleType[]) => void;
};
