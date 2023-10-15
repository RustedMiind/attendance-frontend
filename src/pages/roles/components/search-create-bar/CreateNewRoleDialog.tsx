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
import { CompressedPermissionType } from "../../../../types/CompressedPermission";

export default function CreateNewRoleDialog(props: PropsType) {
  const handleClose = props.close;
  const [permissions, setPermissions] = React.useState<
    null | CompressedPermissionType[]
  >(null);
  React.useEffect(() => {
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
    }, 2000);
  }, []);

  return (
    <Dialog
      component={"form"}
      maxWidth="md"
      fullWidth
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>Create New Role</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Role Name"
          type="text"
          variant="outlined"
          fullWidth
        />
        <Stack my={2}>
          {permissions?.map((permission) => (
            <PermissionInput key={permission.name} permission={permission} />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleClose}>
          Create Role
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  open: boolean;
  close: () => void;
};
