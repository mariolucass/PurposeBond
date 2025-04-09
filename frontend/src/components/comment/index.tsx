import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { CommentAuthorInfo } from "./authorInfo";

export const CommentComponent = ({ comment }: any) => {
  const router = useRouter();
  const authorInfoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isHoveringOutside, setIsHoveringOutside] = useState(false);
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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const isInside = [authorInfoRef, contentRef].some((ref) =>
      ref.current?.contains(event.target as Node)
    );

    setIsHoveringOutside(!isInside);
  };

  return (
    <div
      className={`w-full flex flex-col gap-4 p-4 border-b transition-colors duration-150`}
      onClick={handleCommentContentClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHoveringOutside(false)}
    >
      <div className="flex flex-col gap-4">
        <div ref={authorInfoRef}>
          <CommentAuthorInfo
            author={comment.author}
            createdAt={comment.createdAt}
          />
        </div>

        <p ref={contentRef} className="ml-14  ">
          {comment.content}
        </p>
      </div>
    </div>
  );
};
