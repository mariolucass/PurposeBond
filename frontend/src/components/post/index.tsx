import { PostInterface } from "@/interfaces/posts.interfaces";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Separator } from "../ui/separator";
import { PostAuthorInfo } from "./authorInfo";
import { PostInteractions } from "./interactions";
import { PostMenuOptions } from "./menuOptions";

interface PostProps {
  post: PostInterface;
}

export const PostComponent = ({ post }: PostProps) => {
  const router = useRouter();
  const authorInfoRef = useRef<HTMLDivElement>(null);
  const interactionsRef = useRef<HTMLDivElement>(null);

  const handlePostContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const userHasClickedOutsideInteractionsAndAuthor = [
      interactionsRef,
      authorInfoRef,
    ].some((ref) => ref.current?.contains(event.target as Node));

    if (!userHasClickedOutsideInteractionsAndAuthor) {
      router.push(`/posts/${post.id}`);
    }
  };

  const handleClickAuthor = () => {
    router.push(`/users/${post.author.id}`);
  };

  return (
    <div
      className="flex flex-row w-full p-6 bg-white rounded-lg min-h-[200px] gap-8"
      onClick={handlePostContentClick}
    >
      <div className="w-2/3">
        <div className="w-full flex flex-col gap-4 ">
          <div ref={authorInfoRef} onClick={handleClickAuthor}>
            <PostAuthorInfo author={post.author} createdAt={post.createdAt} />
          </div>

          <p className="text-gray-800 max-w-56 ml-16">{post.content}</p>
        </div>
      </div>

      <Separator orientation="vertical" />

      <div className="w-1/3 flex flex-col justify-between">
        <div ref={interactionsRef} className="flex flex-col justify-between">
          <PostMenuOptions />

          <PostInteractions postId={post.id} count={post._count} />
        </div>
      </div>
    </div>
  );
};
