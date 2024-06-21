import { EmptyFollowing } from "@/components/_emptyComponents/user/emptyFollowing";
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
import { getFollowingByUser } from "@/services/follow.services";
import { Fragment, useEffect, useState } from "react";

export const FollowingDialog = ({ user, isProfile }: any) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUser = isProfile ? authenticatedUser : user;

  const { isDialogFollowingOpen, setIsDialogFollowingOpen } = useModalContext();
  const { getFollowingForAuthenticatedUser } = useAuthContext();

  const closeDialogFollowing = () => {
    setIsDialogFollowingOpen(false);
  };

  const [following, setFollowing] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const following = isProfile
          ? await getFollowingForAuthenticatedUser()
          : await getFollowingByUser(user.id);

        setFollowing(following);
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    fetchFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={isDialogFollowingOpen} onOpenChange={closeDialogFollowing}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{displayedUser.username} Following</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 py-4">
          {following.length ? (
            <ul className="flex flex-col gap-4 min-h-200 overflow-y-auto">
              {following.map((user: any) => (
                <Fragment key={user.id}>
                  <UserCard user={user} />
                  <Separator />
                </Fragment>
              ))}
            </ul>
          ) : (
            <EmptyFollowing username={displayedUser.username} />
          )}
        </div>

        <Separator />
      </DialogContent>
    </Dialog>
  );
};
