import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/AuthContext";

const ProtectedRoute = () => {
  const authContext = useAuth();

  if (!authContext || !authContext.currentUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
