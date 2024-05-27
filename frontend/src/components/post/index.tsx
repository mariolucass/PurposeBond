import { PostInterface } from "@/interfaces/posts.interfaces";
import { handleDateWithMoment } from "@/utils/handleDateWithMoment";
import { MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

interface PostProps {
  post: PostInterface;
  pageType: "dashboard" | "profile" | "userPage";
}

export const PostComponent = ({ post, pageType }: any) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentDropdownIsOpen, setCommentDropdownIsOpen] = useState(false);

  const [postStateCount, setPostStateCount] = useState({
    likes: post._count.likes,
    comments: post._count.comments,
  });

  const LikePost = () => {
    setPostStateCount((postState) => {
      return { ...postState, likes: postStateCount.likes + 1 };
    });
    setIsLiked(!isLiked);
  };

  const UnlikePost = () => {
    setPostStateCount((postState) => {
      return { ...postState, likes: postStateCount.likes - 1 };
    });
    setIsLiked(!isLiked);
  };

  return (
    <Fragment key={post.id}>
      <Link href={`/posts/${post.id}`}>
        <div className="flex-col w-full p-6 bg-white rounded-lg  ">
          <div className="flex flex-col gap-8">
            <div className="flex items-center">
              <Avatar className="mr-4">
                <AvatarImage src="https://github.com/shadcn.png" />
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

            <p className="text-gray-800 max-w-64">{post.content}</p>

            <div className="self-end flex gap-2">
              <ThumbsUp
                onClick={() => {
                  isLiked ? UnlikePost() : LikePost();
                }}
              />
              <h2>{postStateCount.likes}</h2>

              <MessageSquare />
              <h2>{postStateCount.comments}</h2>
            </div>
          </div>
        </div>
      </Link>
    </Fragment>
  );
};
