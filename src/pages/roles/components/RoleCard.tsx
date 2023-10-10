import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";

function RoleCard(props: PropsType) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "50%", md: "33.33%", lg: "25%", xl: "20%" },
        p: 1,
      }}
    >
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.placeholder ? <Skeleton width="100%" /> : props.name}
          </Typography>
          <Typography variant="body2">
            {props.placeholder ? (
              <Skeleton width="100%" />
            ) : (
              props.accesses.join(", ")
            )}
          </Typography>
        </CardContent>
        <CardActions>
          {props.placeholder ? (
            <Skeleton width="100%" />
          ) : (
            <Button size="small">Edit</Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

type PropsType =
  | {
      placeholder: true;
    }
  | {
      placeholder?: false;
      name: string;
      id: string;
      accesses: string[];
    };

export default RoleCard;
