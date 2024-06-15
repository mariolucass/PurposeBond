"use client";

import { LoadingComponent } from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/auth.context";
import { useFetchProfile } from "@/hooks/user.hook";
import { FollowersDialog } from "@/layouts/UserPage/followersDialog";
import { FollowingDialog } from "@/layouts/UserPage/followingDialog";
import { TabsUserPage } from "@/layouts/UserPage/tabs";
import { UserSectionProfile } from "@/layouts/UserPage/userProfile";

const ProfilePage = () => {
  const { authenticatedUser } = useAuthContext();
  const { isLoadingCurrentProfile, error } = useFetchProfile();

  if (isLoadingCurrentProfile) {
    return <LoadingComponent />;
  }

  if (error || !authenticatedUser) {
    return <div>User not found or not logged in.</div>;
  }

  return (
    <section className="gap-4 min-w-full w-full flex flex-col justify-start">
      <UserSectionProfile isProfile />

      <Separator />

      <TabsUserPage isProfile />

      <FollowersDialog isProfile />

      <FollowingDialog isProfile />
    </section>
  );
};

export default ProfilePage;
