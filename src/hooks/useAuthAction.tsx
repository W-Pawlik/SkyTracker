import { useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthFunction = () => Promise<any>;

export const useAuthAction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthAction = async (authFunction: AuthFunction) => {
    setLoading(true);
    setError(null);
    setWarning("Verify your email address");

    try {
      await authFunction();
      navigate("/app");
    } catch (error: any) {
      setWarning(null);
      setError(error?.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
      setWarning(null);
    }
  };

  return { handleAuthAction, loading, error, setError, setLoading, warning };
};
