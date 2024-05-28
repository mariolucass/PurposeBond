import { useAuthContext } from "@/contexts/auth.context";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export const CommentComponent = ({ comment, postId }: any) => {
  const { user } = useAuthContext();

  let userIsOwnerOfComment = false;

  if (user) {
    userIsOwnerOfComment = user!.id === comment.author.id;
  }

  return (
    <Fragment>
      <div className="w-full flex flex-col p-4 bg-white rounded-lg">
        <Link href={`/posts/${postId}/comments/${comment.id}`}>
          <div className="flex flex-col space-y-4 gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-lg font-semibold">
                    {comment.author.name}{" "}
                    <span className="text-bgmodal text-sm">
                      {handleDateWithMoment(comment.createdAt)}
                    </span>
                  </h2>
                  <p className="text-bgmodal">@{comment.author.username}</p>
                </div>
              </div>

              {userIsOwnerOfComment && (
                <Ellipsis
                  className=" self-start relative top-0 right-0"
                  onClick={() => {}}
                />
              )}
            </div>
            <p className="text-gray-800">{comment.content}</p>
          </div>
        </Link>
      </div>
      <Separator />
    </Fragment>
  );
};
