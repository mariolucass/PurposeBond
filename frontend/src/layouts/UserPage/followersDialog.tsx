import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { useAuthContext } from "@/contexts/auth.context";
import { useModalContext } from "@/contexts/modal.context";
import { UserInterface } from "@/interfaces/users.interfaces";
import { getFollowersByUser } from "@/services/follow.services";
import { Fragment, useEffect, useState } from "react";

export const FollowersDialog = ({ user, isProfile }: any) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUser = isProfile ? authenticatedUser : user;

  const { isDialogFollowersOpen, setIsDialogFollowersOpen } = useModalContext();
  const { getFollowersForAuthenticatedUser } = useAuthContext();

  const closeDialogFollowers = () => {
    setIsDialogFollowersOpen(false);
  };

  const [followers, setFollowers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const following = isProfile
          ? await getFollowersForAuthenticatedUser()
          : await getFollowersByUser(user.id);

        setFollowers(following);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    fetchFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={isDialogFollowersOpen} onOpenChange={closeDialogFollowers}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{displayedUser.username} Followers</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ul className="flex flex-col gap-4 min-h-200 overflow-y-auto">
            {followers.map((user: any) => (
              <Fragment key={user.id}>
                <UserCard user={user} />

                <Separator />
              </Fragment>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
