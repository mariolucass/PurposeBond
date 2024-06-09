import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserCard } from "@/components/userCard";
import { useAuthContext } from "@/contexts/auth.context";
import { useModalContext } from "@/contexts/modal.context";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { Fragment } from "react";

export const FollowingDialog = ({ user, isProfile }: any) => {
  const { authenticatedUser } = useAuthContext();
  const displayedUser = isProfile ? authenticatedUser : user;

  const { isDialogFollowingOpen, handleFollowingDialog } = useModalContext();

  return (
    <Dialog open={isDialogFollowingOpen} onOpenChange={handleFollowingDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{displayedUser.username} Following</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="grid gap-4 py-4">
          <ul>
            {displayedUser.following.map((user: any) => {
              return (
                <Fragment key={user.id}>
                  <UserCard user={user} />
                </Fragment>
              );
            })}
          </ul>
        </div>

        <Separator />
      </DialogContent>
    </Dialog>
  );
};
