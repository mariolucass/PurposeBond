import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { DeletePostModal } from "./deleteModal";
import { UpdatePostModal } from "./updateModal";

export const PostMenuOptions = ({
  isPostAuthor,
  post,
}: {
  isPostAuthor: boolean;
  post: PostInterface;
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="self-end">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Ellipsis className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          {isPostAuthor ? (
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUpdateModalOpen(true);
                }}
              >
                Update Post
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete Post
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => console.log("Post hidden")}>
                Hide Post
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log("Post reported")}>
                Report Post
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isPostAuthor && (
        <>
          <UpdatePostModal
            modalOpen={isUpdateModalOpen}
            setModalOpen={setIsUpdateModalOpen}
            post={post}
          />
          <DeletePostModal
            modalOpen={isDeleteModalOpen}
            setModalOpen={setIsDeleteModalOpen}
            postId={post.id}
          />
        </>
      )}
    </>
  );
};
