import { useAuthContext } from "@/contexts/auth.context";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

interface CommentAuthorInfoProps {
  author: {
    id: string;
    name: string;
    username: string;
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
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">
            {author.name}{" "}
            <span className="text-bgmodal text-sm">
              {handleDateWithMoment(createdAt)}
            </span>
          </h2>
          <p className="text-bgmodal">@{author.username}</p>
        </div>
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
