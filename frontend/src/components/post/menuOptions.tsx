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
import { DeletePostModal } from "./deleteModal";
import { UpdatePostModal } from "./updateModal";

export const PostMenuOptions = () => {
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
              Delete Post
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem
              onClick={() => {
                setIsUpdateModalOpen(true);
              }}
            >
              Update Post
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <UpdatePostModal modalOpen={isUpdateModalOpen} />

      <DeletePostModal modalOpen={isDeleteModalOpen} />
    </>
  );
};
