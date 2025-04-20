import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostService } from "@/services/posts.services";
import { Trash2 } from "lucide-react";

export const DeletePostModal = ({ postId, modalOpen, setModalOpen }: any) => {
  const deletePost = async () => {
    await PostService.delete(postId);
    setModalOpen(false);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <Dialog open={modalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-6 gap-4 flex flex-col">
        <DialogHeader className="flex gap-4">
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Delete Post
          </DialogTitle>

          <DialogDescription className="mt-8">
            This action cannot be undone. Are you sure you want to permanently
            delete this post?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={deletePost}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
