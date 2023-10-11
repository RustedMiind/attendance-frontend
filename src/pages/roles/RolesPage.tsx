import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import RoleCard from "./components/RoleCard";
import RolesContainer from "./components/RolesContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../statics/api";
import {
  ApiErrorResponse,
  ApiSuccessfullResponse,
} from "../../types/ApiResponses";
import { RoleType } from "../../types/Role";
import RolesPlaceholder from "./components/RolesPlaceholder";

function RolesPage() {
  const [roles, setRoles] = useState<RoleType[] | "loading" | "error">(
    "loading"
  );
  const [error, setError] = useState<{ message: string } | null>(null);
  useEffect(() => {
    setError(null);
    setTimeout(() => {
      axios
        .get<ApiSuccessfullResponse<RoleType[]>>(api("role/all"))
        .then((res) => {
          setRoles(res.data.data);
          console.log(res);
        })
        .catch((err: ApiErrorResponse<any>) => {
          console.log("err", err);
          setRoles("error");
          setError(err.response.data);
        });
    }, 1000);
  }, []);
  return (
    <Box>
      {Array.isArray(roles) && <RolesContainer roles={roles} />}
      {error && (
        <Typography variant="h5" textAlign="center" color="error">
          {error.message}
        </Typography>
      )}
      {roles === "loading" && <RolesPlaceholder />}
    </Box>
  );
}

export default RolesPage;
