import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { CalendarClock } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
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

export const PostAuthorInfo = ({ author, createdAt }: PostAuthorInfoProps) => {
  return (
    <div className="min-w-full flex items-center justify-between">
      <div className="min-w-full flex items-center gap-4">
        <Avatar className="w-[48px] h-[48px]">
          <AvatarImage src={author.profileImage} />
        </Avatar>

        <div className="w-full flex gap-4 items-center justify-between">
          <HoverCardAuthor author={author} />

          <Separator orientation="vertical" />

          <span className="w-[104px] text-bgmodal justify-around text-sm flex items-center ">
            <CalendarClock />

            {handleDateWithMoment(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
