"use client";

import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/auth.context";
import { TabsUserPage } from "@/layouts/UserPage/tabs";
import { UserSectionProfile } from "@/layouts/UserPage/userProfile";
import { getProfile } from "@/services/users.services";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user, setUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(user ? false : true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedUser = await getProfile();
        setUser(fetchedUser);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found or not logged in.</div>;
  }

  return (
    <section className="gap-4 min-w-full w-full flex flex-col justify-start">
      <UserSectionProfile user={user} />

      <Separator />

      <TabsUserPage userId={user.id} />
    </section>
  );
};

export default ProfilePage;
