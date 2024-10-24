import { Typography } from "@mui/material";
import { CommonButton } from "../components/presentational/Button";
import { useAuth } from "../contexts/authContext/AuthContext";
import { doSignOut } from "../services/fireBase/auth";

const App = () => {
  const authContext = useAuth();

  return (
    <>
      <Typography variant="h1">SkyTracker App</Typography>
      <Typography variant="body1">
        Welcome back {authContext?.currentUser?.displayName || authContext?.currentUser?.email}{" "}
      </Typography>
      <CommonButton text="Sign out" size="large" onClick={() => doSignOut()} />
    </>
  );
};
export default App;
