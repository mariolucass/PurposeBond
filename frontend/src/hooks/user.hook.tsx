import { useAuthContext } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import { api } from "../services/config/api";

export const useFetchProfile = () => {
  const { setAuthenticatedUser } = useAuthContext();

  const [isLoadingCurrentProfile, setIsLoadingCurrentProfile] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const token = localStorage.getItem("tokenRedeSocial");

    const fetchUser = async () => {
      try {
        const response = await api.get("/profile");
        setAuthenticatedUser(response.data);
      } catch (error) {
        localStorage.removeItem("tokenRedeSocial");
        setError(error);
      } finally {
        setIsLoadingCurrentProfile(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setIsLoadingCurrentProfile(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoadingCurrentProfile, error };
};
