"use client";

import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/auth.context";
import { useFetchProfile } from "@/hooks/user.hook";
import { FollowedByDialog } from "@/layouts/UserPage/followedByDialog";
import { FollowingDialog } from "@/layouts/UserPage/followingDialog";
import { TabsUserPage } from "@/layouts/UserPage/tabs";
import { UserSectionProfile } from "@/layouts/UserPage/userProfile";

const ProfilePage = () => {
  const { authenticatedUser } = useAuthContext();

  const { isLoadingCurrentProfile, error } = useFetchProfile();

  if (isLoadingCurrentProfile) {
    return <div>Loading...</div>;
  }

  if (error || !authenticatedUser) {
    return <div>User not found or not logged in.</div>;
  }

  console.log(authenticatedUser);

  return (
    <section className="gap-4 min-w-full w-full flex flex-col justify-start">
      <UserSectionProfile isProfile />

      <Separator />

      <TabsUserPage isProfile />

      <FollowedByDialog isProfile />

      <FollowingDialog isProfile />
    </section>
  );
};

export default ProfilePage;
