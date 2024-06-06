import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserCard } from "@/components/userCard";
import { useAuthContext } from "@/contexts/auth.context";
import { useModalContext } from "@/contexts/modal.context";
import { Fragment } from "react";

export const FollowedByDialog = ({ user, isProfile }: any) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUser = isProfile ? authenticatedUser : user;

  const { isDialogFollowedByOpen, setIsDialogFollowedByOpen } =
    useModalContext();

  const closeDialogFollowedBy = () => {
    setIsDialogFollowedByOpen(false);
  };

  return (
    <Dialog open={isDialogFollowedByOpen} onOpenChange={closeDialogFollowedBy}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{displayedUser.username} Followers</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ul>
            {displayedUser.followedBy.map((user: any) => {
              return (
                <Fragment key={user.id}>
                  <UserCard user={user} />
                </Fragment>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
