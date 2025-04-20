import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import socket from "@/lib/socket";
import { ProfileService } from "@/services/profile.services";

import { useEffect, useState } from "react";

export const useFetchProfile = () => {
  const { setAuthenticatedUser, authenticatedUser } = useAuthContext();

  const [isLoadingCurrentProfile, setIsLoadingCurrentProfile] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const token = localStorage.getItem("tokenRedeSocial");

    const fetchUser = async () => {
      try {
        const fetchedUser = await ProfileService.getProfile();
        setAuthenticatedUser(fetchedUser);
        socket.io.opts.query = { userId: fetchedUser.id };
        socket.connect();
      } catch (error) {
        localStorage.removeItem("tokenRedeSocial");
        setError(error);
      } finally {
        setIsLoadingCurrentProfile(false);
      }
    };

    if (token && !authenticatedUser) {
      fetchUser();
    } else {
      setIsLoadingCurrentProfile(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoadingCurrentProfile, error };
};
