import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { handleJoinedAtDate } from "@/utils/handleDateWithMoment";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

export const HoverCardAuthor = ({
  author,
}: {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage?: string;
    description?: string;
    joinedAt: string;
  };
}) => {
  const router = useRouter();

  const handleClickAuthor = () => {
    router.push(`/users/${author.id}`);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="flex gap-4 items-center justify-evenly"
          onClick={handleClickAuthor}
        >
          <div>
            <h2 className="cursor-pointer text-sm font-semibold">
              {author.name}
            </h2>

            <p className="cursor-pointer text-gray-500 text-sm">
              @{author.username}
            </p>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={author.profileImage} />
          </Avatar>

          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{author.username}</h4>

            <p className="text-sm">
              {author.description ? author.description : "No description."}
            </p>

            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Joined {handleJoinedAtDate(author.joinedAt)}.
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
