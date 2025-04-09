import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
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
  const { authenticatedUser } = useAuthContext();
  const router = useRouter();

  const authorInfoRef = useRef<HTMLDivElement>(null);
  const interactionsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePostContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const userHasClickedOutsideInteractionsAndAuthor = [
      interactionsRef,
      authorInfoRef,
      contentRef,
    ].some((ref) => ref.current?.contains(event.target as Node));

    if (!userHasClickedOutsideInteractionsAndAuthor) {
      router.push(`/posts/${post.id}`);
    }
  };

  const isPostAuthor = authenticatedUser?.id === post.author.id;

  return (
    <div
      className="flex flex-row w-full px-6 py-5 gap-6 border-b border-border bg-background text-foreground transition-colors duration-150 cursor-pointer"
      onClick={handlePostContentClick}
    >
      <div className="w-2/3">
        <div ref={authorInfoRef} className="flex flex-col gap-3">
          <PostAuthorInfo author={post.author} createdAt={post.createdAt} />

          <p
            ref={contentRef}
            className="ml-14 text-sm leading-relaxed max-w-prose break-words"
          >
            {post.content}
          </p>
        </div>
      </div>

      <Separator orientation="vertical" className="mx-2" />

      <div className="w-1/3 flex flex-col justify-between">
        <div
          ref={interactionsRef}
          className="flex flex-col justify-between h-full gap-2"
        >
          <PostMenuOptions isPostAuthor={isPostAuthor} />

          <PostInteractions postId={post.id} count={post._count} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className=" flex flex-row w-full p-4 gap-4 border-b-2 hover:bg-gray-800 transition-colors duration-150 cursor-pointer"
      onClick={handlePostContentClick}
    >
      <div className="w-2/3">
        <div ref={authorInfoRef} className="flex flex-col gap-4 pl-4">
          <PostAuthorInfo author={post.author} createdAt={post.createdAt} />

          <p ref={contentRef} className="max-w-72 ml-16">
            {post.content}
          </p>
        </div>
      </div>

      <Separator orientation="vertical" className="mx-2" />

      <div className="w-1/3 h-full flex flex-col justify-between">
        <div
          ref={interactionsRef}
          className=" h-full flex flex-col justify-between"
        >
          <PostMenuOptions isPostAuthor={isPostAuthor} />

          <PostInteractions postId={post.id} count={post._count} />
        </div>
      </div>
    </div>
  );
};
