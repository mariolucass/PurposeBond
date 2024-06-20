import { useAuthContext } from "@/contexts/auth.context";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { Avatar, AvatarImage } from "../ui/avatar";
import { HoverCardAuthor } from "./hoverAuthorInfo";
import { PostMenuOptions } from "./menuOptions";

interface PostAuthorInfoProps {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
  };
  createdAt: Date;
}

export const PostAuthorInfo = ({ author, createdAt }: PostAuthorInfoProps) => {
  const { verifyOwnership } = useAuthContext();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="w-[48px] h-[48px] border-gray-800 border-2">
          <AvatarImage src={author.profileImage} />
        </Avatar>

        <div className="flex gap-2 items-center h-[32px] w-[330px] justify-between">
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
