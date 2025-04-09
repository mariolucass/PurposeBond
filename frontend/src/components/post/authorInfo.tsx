import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { Avatar, AvatarImage } from "../ui/avatar";
import { HoverCardAuthor } from "./hoverAuthorInfo";

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

export const PostAuthorInfo = ({ author, createdAt }: PostAuthorInfoProps) => (
  <div className="min-w-full flex items-start justify-between">
    <Avatar className="w-[48px] h-[48px]">
      <AvatarImage src={author.profileImage} />
    </Avatar>

    <div className="w-10/12 flex gap-4 items-start justify-between">
      <HoverCardAuthor author={author} />

      <span className="w-[104px] text-bgmodal justify-around text-sm flex items-start mt-1 text-gray-500">
        {handleDateWithMoment(createdAt)}
      </span>
    </div>
  </div>
);
