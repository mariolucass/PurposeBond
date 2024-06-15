import { PostInterface } from "@/interfaces/posts.interfaces";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PostAuthorInfo } from "./authorInfo";
import { PostInteractions } from "./interactions";

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
      className="flex-col w-full p-6 bg-white rounded-lg"
      onClick={handlePostContentClick}
    >
      <div className="w-full flex flex-col gap-4 ">
        <div ref={authorInfoRef} onClick={handleClickAuthor}>
          <PostAuthorInfo author={post.author} createdAt={post.createdAt} />
        </div>

        <p className="text-gray-800 max-w-80 ml-14 min-h-24">{post.content}</p>

        <div
          ref={interactionsRef}
          className="min-w-full flex justify-start ml-14"
        >
          <PostInteractions postId={post.id} count={post._count} />
        </div>
      </div>
    </div>
  );
};
