import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { PostInterface } from "@/interfaces/posts.interfaces";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Separator } from "../ui/separator";
import { PostAuthorInfo } from "./authorInfo";
import { PostInteractions } from "./interactions";
import { PostMenuOptions } from "./menuOptions";

export const PostComponent = ({ post }: { post: PostInterface }) => {
  const { authenticatedUser } = useAuthContext();
  const router = useRouter();

  const authorInfoRef = useRef<HTMLDivElement>(null);
  const interactionsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePostContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedOutsideProtectedRefs = [
      interactionsRef,
      authorInfoRef,
      contentRef,
    ].some((ref) => ref.current?.contains(event.target as Node));

    if (!clickedOutsideProtectedRefs) {
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

      <Separator orientation="vertical" className="h-[120px]" />

      <div className="w-1/3 flex flex-col justify-between">
        <div
          ref={interactionsRef}
          className="flex flex-col justify-between h-full gap-2"
        >
          <PostMenuOptions isPostAuthor={isPostAuthor} post={post} />

          <PostInteractions
            postId={post.id}
            count={post._count}
            router={router}
          />
        </div>
      </div>
    </div>
  );
};
