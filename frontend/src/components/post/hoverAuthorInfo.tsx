import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarDays } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface HoverCardAuthorProps {
  author: {
    name: string;
    username: string;
    profileImage?: string;
    description?: string;
  };
}

export const HoverCardAuthor = ({ author }: HoverCardAuthorProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex gap-2 items-center h-[32px] w-[224px] justify-evenly">
          <h2 className="cursor-pointer">{author.name}</h2>

          <Separator orientation="vertical" />

          <p className="cursor-pointer">@{author.username}</p>

          <Separator orientation="vertical" />
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
              {author.description
                ? author.description
                : "The React Framework – created and maintained by @vercel."}
            </p>

            <Button>Follow</Button>

            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
