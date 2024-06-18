import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const DeleteCommentModal = ({ commentId, modalOpen }: any) => {
  const deleteComment = () => {};

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete comment</DialogTitle>

          <DialogDescription>
            Are you sure to delete this comment?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={deleteComment}>Delete</Button>

          <Button>Exit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
