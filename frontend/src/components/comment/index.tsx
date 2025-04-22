import { useAuthContext } from "@/contexts/domains/AuthDomain/auth.context";
import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PostAuthorInfo } from "../post/authorInfo";
import { Separator } from "../ui/separator";
import { CommentInteractions } from "./interactions";
import { CommentMenuOptions } from "./menuOptions";

export const CommentComponent = ({ comment }: any) => {
  const router = useRouter();
  const { currentPost } = usePostContext();
  const { authenticatedUser } = useAuthContext();

  const authorInfoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const handleCommentContentClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const clickedInsideSensitiveArea = [authorInfoRef, contentRef].some((ref) =>
      ref.current?.contains(event.target as Node)
    );

    if (!clickedInsideSensitiveArea) {
      router.push(`/posts/${currentPost!.id}/comments/${comment.id}`);
    }
  };

  const isCommentAuthor = authenticatedUser?.id === comment.author.id;

  return (
    <div
      className="flex flex-row w-full px-6 py-5 gap-6 border-b border-border bg-background text-foreground transition-colors duration-150 cursor-pointer"
      onClick={handleCommentContentClick}
    >
      <div className="w-2/3">
        <div ref={authorInfoRef} className="flex flex-col gap-3">
          <PostAuthorInfo
            author={comment.author}
            createdAt={comment.createdAt}
          />

          <p
            ref={contentRef}
            className="ml-14 text-sm leading-relaxed max-w-prose break-words"
          >
            {comment.content}
          </p>
        </div>
      </div>

      <Separator orientation="vertical" className="h-[100px]" />

      <div className="flex flex-col justify-between">
        <CommentMenuOptions isCommentAuthor={isCommentAuthor} />

        <CommentInteractions commentId={comment.id} count={{ likes: 1 }} />
      </div>
    </div>
  );
};
