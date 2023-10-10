import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  LoginInputsTypeUsername,
  requestSetUser,
} from "../../redux/setters/userSetters";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

function LoginDialog(props: PropsType) {
  const [status, setStatus] = React.useState<"loading" | "none" | "error">(
    "none"
  );
  const [data, setData] = React.useState<LoginInputsTypeUsername>({
    username: "",
    password: "",
  });
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, username: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, password: e.target.value });
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    props.close();
  };
  const handleSubmit = () => {
    requestSetUser(dispatch, data, () => {
      setStatus("loading");
    })
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={status === "loading" ? () => {} : props.close}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          name="username"
          fullWidth
          variant="standard"
          value={data.username}
          onChange={handleUsernameChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          name="password"
          fullWidth
          variant="standard"
          value={data.password}
          onChange={handlePasswordChange}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <Stack spacing={1} direction={"row"} pb={2}>
          <Button
            disabled={status === "loading"}
            color={status === "error" ? "error" : undefined}
            onClick={props.close}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={status === "loading"}
            color={status === "error" ? "error" : undefined}
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

type PropsType = {
  isOpen: boolean;
  close: () => void;
};

export default LoginDialog;