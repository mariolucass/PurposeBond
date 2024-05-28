"use client";

import { Separator } from "@/components/ui/separator";
import { UserInterface } from "@/interfaces/users.interfaces";
import { TabsUserPage } from "@/layouts/UserPage/tabs";
import { UserSectionProfile } from "@/layouts/UserPage/userProfile";
import { getUser } from "@/services/users.services";
import { useEffect, useState } from "react";

interface UserPageProps {
  params: { id: string };
}

const UserPage = ({ params: { id } }: UserPageProps) => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(id);
        setUser(fetchedUser);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
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

export default UserPage;
