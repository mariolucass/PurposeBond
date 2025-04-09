import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { DeletePostModal } from "./deleteModal";
import { UpdatePostModal } from "./updateModal";

export const PostMenuOptions = ({
  isPostAuthor,
}: {
  isPostAuthor: boolean;
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
          <MenubarTrigger className="hover:bg-slate-200 p-1 rounded">
            <Ellipsis className="w-5 h-5" />
          </MenubarTrigger>

          <MenubarContent>
            {isPostAuthor ? (
              <>
                <MenubarItem onClick={() => setIsUpdateModalOpen(true)}>
                  Update Post
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem onClick={() => setIsDeleteModalOpen(true)}>
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
          <UpdatePostModal modalOpen={isUpdateModalOpen} />
          <DeletePostModal modalOpen={isDeleteModalOpen} />
        </>
      )}
    </>
  );
};
