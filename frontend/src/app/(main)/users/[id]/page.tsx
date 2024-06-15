"use client";

import { LoadingComponent } from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import { UserInterface } from "@/interfaces/users.interfaces";
import { FollowersDialog } from "@/layouts/UserPage/followersDialog";
import { FollowingDialog } from "@/layouts/UserPage/followingDialog";
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
    return <LoadingComponent />;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <section className="gap-4 min-w-full w-full flex flex-col justify-start">
      <UserSectionProfile user={user} />

      <Separator />

      <TabsUserPage userId={user.id} />

      <FollowersDialog user={user} />

      <FollowingDialog user={user} />
    </section>
  );
};

export default UserPage;
