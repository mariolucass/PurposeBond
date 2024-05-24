import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import Link from "next/link";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export const PostComponent = ({ post }: any) => {
  return (
    <Fragment key={post.id}>
      <div className="w-full p-6 bg-white rounded-lg shadow-md border-t-4 border-x-bgmodal">
        <Link href={`/posts/${post.id}`}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-lg font-semibold">
                  {post.author.name}{" "}
                  <span className="text-bgmodal text-sm">
                    {handleDateWithMoment(post.createdAt)}
                  </span>
                </h2>

                <p className="text-bgmodal">@{post.author.username}</p>
              </div>
            </div>

            <p className="text-gray-800">{post.content}</p>
          </div>
        </Link>
      </div>

      <Separator />
    </Fragment>
  );
};
