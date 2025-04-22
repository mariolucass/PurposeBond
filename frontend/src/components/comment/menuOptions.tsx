import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { DeleteCommentModal } from "./deleteModal";
import { UpdateCommentModal } from "./updateModal";

export const CommentMenuOptions = ({
  isCommentAuthor,
}: {
  isCommentAuthor: boolean;
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
          {isCommentAuthor ? (
            <>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUpdateModalOpen(true);
                }}
              >
                Update Comment
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
              >
                Delete Comment
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => console.log("Post hidden")}>
                Hide Comment
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log("Post reported")}>
                Report Comment
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isCommentAuthor && (
        <>
          <UpdateCommentModal
            modalOpen={isUpdateModalOpen}
            setModalOpen={setIsUpdateModalOpen}
          />
          <DeleteCommentModal
            modalOpen={isDeleteModalOpen}
            setModalOpen={setIsDeleteModalOpen}
          />
        </>
      )}
    </>
  );
};
