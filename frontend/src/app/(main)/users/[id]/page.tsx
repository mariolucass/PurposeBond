"use client";

import { LoadingComponent } from "@/components/common/loading";
import { Navigator } from "@/components/common/navigator";

import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { UserInterface } from "@/interfaces/users.interfaces";
import { FollowersDialog } from "@/layouts/UserPage/followersDialog";
import { FollowingDialog } from "@/layouts/UserPage/followingDialog";
import { TabsUserPage } from "@/layouts/UserPage/tabs";
import { UserSectionProfile } from "@/layouts/UserPage/userProfile";
import { UserService } from "@/services/users.services";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserPageProps {
  params: { id: string };
}

const UserPage = ({ params: { id } }: UserPageProps) => {
  const [user, setUser] = useState<UserInterface>({} as UserInterface);
  const [isLoading, setIsLoading] = useState(true);
  const { authenticatedUser } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (authenticatedUser) {
      if (id === authenticatedUser.id) {
        router.push("/profile");
      }
    }

    const fetchUser = async () => {
      try {
        const fetchedUser = await UserService.getById(id);
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
    <section className="min-w-full w-full flex flex-col justify-start">
      <Navigator name={user.name} description={`@${user.username}`} />

      <UserSectionProfile user={user} />

      <Separator />

      <TabsUserPage user={{ id: user.id, username: user.username }} />

      <FollowersDialog user={user} />

      <FollowingDialog user={user} />
    </section>
  );
};

export default UserPage;
