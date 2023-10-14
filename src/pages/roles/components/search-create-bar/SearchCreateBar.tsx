import {
  Box,
  Button,
  IconButton,
  Stack,
  InputAdornment,
  FormControl,
  InputLabel,
  FilledInput,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateNewRoleDialog from "./CreateNewRoleDialog";
import { useState } from "react";

function SearchCreateBar(props: PropsType) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearch(e.target.value);
  };
  return (
    <>
      <Stack direction={"row"} p={1} flexWrap={"wrap"}>
        <Box
          width={{ xs: "calc(100% - 10rem)", md: "calc(100% - 15rem)" }}
          sx={{ pr: 1 }}
        >
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="filled-adornment-password">Search</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              sx={{ bgcolor: "secondary" }}
              type={"text"}
              value={props.search}
              onChange={handleSearchChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box width={{ xs: "10rem", md: "15rem" }} sx={{ pl: 1 }}>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            fullWidth
            sx={{ height: "100%" }}
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            Create New Role
          </Button>
        </Box>
      </Stack>

      <CreateNewRoleDialog
        open={dialogOpen}
        close={() => {
          setDialogOpen(false);
        }}
      />
    </>
  );
}

type PropsType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default SearchCreateBar;
