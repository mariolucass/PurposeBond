import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { Ellipsis } from "lucide-react";
import { HoverCardAuthor } from "../post/hoverAuthorInfo";
import { Avatar, AvatarImage } from "../ui/avatar";

interface CommentAuthorInfoProps {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
    joinedAt: string;
  };

  createdAt: Date;
}

export const CommentAuthorInfo = ({
  author,
  createdAt,
}: CommentAuthorInfoProps) => {
  const { verifyOwnership } = useAuthContext();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="mr-4">
          <AvatarImage src={author.profileImage} />
        </Avatar>

        <HoverCardAuthor author={author} />
      </div>

      {verifyOwnership(author.id) && (
        <Ellipsis
          className=" self-start relative top-0 right-0"
          onClick={() => {}}
        />
      )}
    </div>
  );
};
