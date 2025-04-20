import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { PostAuthorInfo } from "../post/authorInfo";

export const CommentComponent = ({ comment }: any) => {
  const router = useRouter();
  const authorInfoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const { currentPost } = usePostContext();

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

  return (
    <div
      className="flex flex-row w-full px-6 py-5 gap-6 border-b border-border bg-background text-foreground transition-colors duration-150 cursor-pointer"
      onClick={handleCommentContentClick}
    >
      <div className="w-2/3">
        <div ref={authorInfoRef}>
          <PostAuthorInfo
            author={comment.author}
            createdAt={comment.createdAt}
          />
        </div>

        <p
          ref={contentRef}
          className="ml-14 text-sm leading-relaxed max-w-prose break-words"
        >
          {comment.content}
        </p>
      </div>
    </div>
  );
};
