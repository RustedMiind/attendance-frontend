import { Box, Typography } from "@mui/material";
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
import SearchCreateBar from "./components/search-create-bar/SearchCreateBar";

function RolesPage() {
  const [roles, setRoles] = useState<RoleType[] | "loading" | "error">(
    "loading"
  );
  const [error, setError] = useState<{ message: string } | null>(null);
  const [search, setSearch] = useState("");
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
    <>
      <Box>
        <SearchCreateBar
          setRoles={setRoles}
          search={search}
          setSearch={setSearch}
        />
        {Array.isArray(roles) && (
          <RolesContainer
            roles={roles.filter((role) => {
              const condition = role.name
                .toLowerCase()
                .includes(search.toLocaleLowerCase());
              return condition;
            })}
          />
        )}
        {error && (
          <Typography variant="h5" textAlign="center" color="error">
            {error.message}
          </Typography>
        )}
        {roles === "loading" && <RolesPlaceholder />}
      </Box>
    </>
  );
}

export default RolesPage;
