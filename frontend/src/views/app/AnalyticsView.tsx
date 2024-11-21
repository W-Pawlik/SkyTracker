import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../contexts/authContext/AuthContext";

export const AnalyticsView = () => {
  const auth = useAuth();
  return (
    <Box>
      <Typography variant="h1">Analytics View</Typography>
      <Typography>{auth.currentUser?.displayName}</Typography>
    </Box>
  );
};
