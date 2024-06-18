import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAuthContext } from "@/contexts/auth.context";
import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { DeleteCommentModal } from "./deleteModal";
import { UpdateCommentModal } from "./updateModal";

export const CommentMenuOptions = () => {
  const { authenticatedUser } = useAuthContext();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            <Ellipsis className="relative top-0 right-0" />
          </MenubarTrigger>

          <MenubarContent>
            <MenubarItem
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              Delete Comment
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem
              onClick={() => {
                setIsUpdateModalOpen(true);
              }}
            >
              Update Comment
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <UpdateCommentModal modalOpen={isUpdateModalOpen} />

      <DeleteCommentModal modalOpen={isDeleteModalOpen} />
    </>
  );
};
