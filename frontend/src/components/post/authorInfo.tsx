import { useAuthContext } from "@/contexts/auth.context";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { HoverCardAuthor } from "./hoverAuthorInfo";
import { PostMenuOptions } from "./menuOptions";

interface PostAuthorInfoProps {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
    description?: string;
    joinedAt: string;
  };
  createdAt: Date;
}

export const PostAuthorInfo = ({ author, createdAt }: PostAuthorInfoProps) => {
  const { verifyOwnership } = useAuthContext();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="w-[48px] h-[48px]">
          <AvatarImage src={author.profileImage} />
        </Avatar>

        <div className="flex gap-4 items-center justify-between">
          <HoverCardAuthor author={author} />

          <Separator orientation="vertical" />

          <span className="text-bgmodal text-sm">
            {handleDateWithMoment(createdAt)}
          </span>
        </div>
      </div>

      {verifyOwnership(author.id) && <PostMenuOptions />}
    </div>
  );
};
