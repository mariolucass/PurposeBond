import { useAuthContext } from "@/contexts/auth.context";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { HoverCardAuthor } from "./hoverAuthorInfo";
import { PostMenuOptions } from "./menuOptions";

interface PostAuthorInfoProps {
  author: {
    id: string;
    name: string;
    username: string;
  };
  createdAt: Date;
}

export const PostAuthorInfo = ({ author, createdAt }: PostAuthorInfoProps) => {
  const { verifyOwnership } = useAuthContext();

  const [isHovered, SetIsHovered] = useState();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="mr-4">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>

        <div className="flex gap-2 items-center h-[32px]">
          <HoverCardAuthor author={author} />

          <span className="text-bgmodal text-sm">
            {handleDateWithMoment(createdAt)}
          </span>
        </div>
      </div>

      {verifyOwnership(author.id) && <PostMenuOptions />}
    </div>
  );
};
