import { Typography } from "@mui/material";
import { useAuth } from "../contexts/authContext/AuthContext";
import { MapView } from "./MapView";

const App = () => {
  const authContext = useAuth();

  return (
    <>
      <Typography variant="h1">SkyTracker App</Typography>
      <Typography variant="body1">
        Welcome back {authContext?.currentUser?.displayName || authContext?.currentUser?.email}{" "}
      </Typography>
      <MapView />
    </>
  );
};
export default App;
