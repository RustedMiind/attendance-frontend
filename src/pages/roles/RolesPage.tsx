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
import { ApiSuccessfullResponse } from "../../types/ApiResponses";
import { RoleType } from "../../types/Role";
import RolesPlaceholder from "./components/RolesPlaceholder";

function RolesPage() {
  const [roles, setRoles] = useState<RoleType[] | "loading" | "error">(
    "loading"
  );
  useEffect(() => {
    setTimeout(() => {
      axios
        .get<ApiSuccessfullResponse<RoleType[]>>(api("role/all"))
        .then((res) => {
          setRoles(res.data.data);
        });
    }, 2000);
  });
  return (
    <Box>
      {Array.isArray(roles) && <RolesContainer roles={roles} />}
      {roles === "loading" && <RolesPlaceholder />}
    </Box>
  );
}

export default RolesPage;
