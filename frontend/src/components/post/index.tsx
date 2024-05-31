import { PostInterface } from "@/interfaces/posts.interfaces";
import Link from "next/link";
import { Fragment } from "react";
import { PostAuthorInfo } from "./authorInfo";
import { PostInteractions } from "./interactions";

interface PostProps {
  post: PostInterface;
  pageType?: "dashboard" | "profile" | "postPage";
}

export const PostComponent = ({ post, pageType }: any) => {
  return (
    <Fragment key={post.id}>
      <Link href={`/posts/${post.id}`}>
        <div className="flex-col w-full p-6 bg-white rounded-lg  ">
          <div className="flex flex-col gap-4 ">
            <PostAuthorInfo author={post.author} createdAt={post.createdAt} />

            <p className="text-gray-800 max-w-64">{post.content}</p>

            <PostInteractions
              postId={post.id}
              initialComments={post._count.comments}
              initialLikes={post._count.likes}
            />
          </div>
        </div>
      </Link>
    </Fragment>
  );
};
