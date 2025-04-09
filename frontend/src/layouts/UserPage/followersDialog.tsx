import { EmptyFollowers } from "@/components/_emptyComponents/user/emptyFollowers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserCard } from "@/components/userCard";
import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { useModalContext } from "@/contexts/domains/UiDomain/modal.context";
import { UserInterface } from "@/interfaces/users.interfaces";
import { getFollowersByUser } from "@/services/follow.services";
import { Fragment, useEffect, useRef, useState } from "react";

export const FollowersDialog = ({ user, isProfile }: any) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUser = isProfile ? authenticatedUser : user;
  const userCardRef = useRef<HTMLDivElement | null>(null);

  const {
    isDialogFollowersOpen,
    setIsDialogFollowersOpen,
    setIsDialogFollowingOpen,
  } = useModalContext();
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

  const handleUserCardClick = (event: any) => {
    const userHasClickedInCard = userCardRef.current?.contains(
      event.target as Node
    );

    if (userHasClickedInCard) {
      setIsDialogFollowersOpen(false);
      setIsDialogFollowingOpen(false);
    }
  };

  return (
    <Dialog open={isDialogFollowersOpen} onOpenChange={closeDialogFollowers}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{displayedUser.username} Followers</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 py-4">
          {followers.length ? (
            <ul className="flex flex-col gap-4 h-96 overflow-y-auto">
              {followers.map((user: any) => (
                <Fragment key={user.id}>
                  <UserCard user={user} />
                  <Separator />
                </Fragment>
              ))}
            </ul>
          ) : (
            <EmptyFollowers username={displayedUser.username} />
          )}
        </div>

        {!followers.length && <Separator />}
      </DialogContent>
    </Dialog>
  );
};
