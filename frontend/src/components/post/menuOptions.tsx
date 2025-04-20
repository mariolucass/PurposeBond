import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
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

  const handleHidePost = () => {
    console.log("Post hidden");
  };

  const handleReportPost = () => {
    console.log("Post reported");
  };

  return (
    <>
      <Menubar className="border-none self-end">
        <MenubarMenu>
          <MenubarTrigger className="p-1 rounded w-[56px] h-[40px] justify-center hover:bg-accent hover:text-accent-foreground">
            <Ellipsis className="w-5 h-5" />
          </MenubarTrigger>

          <MenubarContent align="end">
            {isPostAuthor ? (
              <>
                <MenubarItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUpdateModalOpen(true);
                  }}
                >
                  Update Post
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete Post
                </MenubarItem>
              </>
            ) : (
              <>
                <MenubarItem onClick={handleHidePost}>Hide Post</MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={handleReportPost}>
                  Report Post
                </MenubarItem>
              </>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

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
