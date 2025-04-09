import { EmptyFollowing } from "@/components/_emptyComponents/user/emptyFollowing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { useFollowContext } from "@/contexts/domains/SocialDomain/follow.context";
import { useModalContext } from "@/contexts/domains/UiDomain/modal.context";
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

  const [followingInModal, setFollowingInModal] = useState<UserInterface[]>([]);

  const { setFollowing, following } = useFollowContext();

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        if (isProfile) {
          const following = await getFollowingForAuthenticatedUser();
          setFollowing(following);
        } else {
          const following = await getFollowingByUser(user.id);
          setFollowingInModal(following);
        }
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };

    fetchFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedUser, isProfile]);

  const listToDisplay = isProfile ? following : followingInModal;

  return (
    <Dialog open={isDialogFollowingOpen} onOpenChange={closeDialogFollowing}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{displayedUser.username} Following</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 py-4">
          {listToDisplay.length ? (
            <ul className="flex flex-col gap-4 h-96 overflow-y-auto">
              {listToDisplay.map((user: any) => (
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

        {!listToDisplay.length && <Separator />}
      </DialogContent>
    </Dialog>
  );
};
