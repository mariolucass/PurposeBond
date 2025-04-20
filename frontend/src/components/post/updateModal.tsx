import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { PostService } from "@/services/posts.services";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export const UpdatePostModal = ({
  post,
  modalOpen,
  setModalOpen,
}: {
  post: PostInterface;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}) => {
  const [updatedContent, setUpdatedContent] = useState(post.content);

  const handleUpdatePost = async () => {
    const updatePost = await PostService.update(post.id, {
      content: updatedContent,
    });
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        className="sm:max-w-[480px] gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Edit your post</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            You can change your post content below. This action is reversible.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          placeholder="Update your message here..."
          className="min-h-[120px]"
          value={updatedContent}
          onChange={(event) => {
            setUpdatedContent(event?.target.value);
          }}
        />

        <DialogFooter className="flex justify-between pt-4">
          <Button
            variant="ghost"
            onClick={() => setModalOpen(false)}
            className="text-muted-foreground"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleUpdatePost}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
