import { useAuthContext } from "@/contexts/authContext.context";
import { useEffect, useState } from "react";
import { api } from "../services/config/api";

const useFetchProfile = () => {
  const { user, setUser } = useAuthContext();

  const [isLoadingCurrentProfile, setisLoadingCurrentProfile] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const token = localStorage.getItem("tokenRedeSocial");

    const fetchUser = async () => {
      try {
        const response = await api.get(`/profile`);
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("tokenRedeSocial");
        setError(error);
      } finally {
        setisLoadingCurrentProfile(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoadingCurrentProfile, error };
};

export default useFetchProfile;
