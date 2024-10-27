import { useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthFunction = () => Promise<any>;

export const useAuthAction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthAction = async (authFunction: AuthFunction) => {
    setLoading(true);
    setError(null);

    try {
      await authFunction();
      navigate("/app");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleAuthAction, loading, error, setError, setLoading };
};
