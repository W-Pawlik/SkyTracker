import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAuth } from "../../contexts/authContext/AuthContext";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectFavAirplanes } from "../../redux/selectors/userSelectors";

export const AnalyticsView = () => {
  const auth = useAuth();
  const favAirplanes = useAppSelector(selectFavAirplanes);

  return (
    <Box>
      <Typography variant="h1">Analytics View</Typography>
      <Typography>{auth.currentUser?.displayName}</Typography>
      {favAirplanes.map((airplane, key) => (
        <Typography key={key}>{airplane.icao24}</Typography>
      ))}
    </Box>
  );
};
