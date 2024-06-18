import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const DeletePostModal = ({ postId, modalOpen }: any) => {
  const deletePost = () => {};

  return (
    <Dialog>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete post</DialogTitle>

          <DialogDescription>
            Are you sure to delete this post?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={deletePost}>Save changes</Button>

          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
