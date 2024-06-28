import { useRouter } from "next/navigation";
import { useRef } from "react";
import { CommentAuthorInfo } from "./authorInfo";

export const CommentComponent = ({ comment, postId }: any) => {
  const router = useRouter();
  const authorInfoRef = useRef<HTMLDivElement>(null);
  const interactionsRef = useRef<HTMLDivElement>(null);

  const handleCommentContentClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const userHasClickedOutsideInteractionsAndAuthor = [
      interactionsRef,
      authorInfoRef,
    ].some((ref) => ref.current?.contains(event.target as Node));

    if (!userHasClickedOutsideInteractionsAndAuthor) {
      router.push(`/posts/${postId}/comments/${comment.id}`);
    }
  };

  return (
    <div
      className="w-full flex flex-col p-4 "
      onClick={handleCommentContentClick}
    >
      <div className="flex flex-col space-y-4 gap-4">
        <div>
          <CommentAuthorInfo
            author={comment.author}
            createdAt={comment.createdAt}
          />
        </div>

        <p className="text-gray-800 ml-14 min-h-24">{comment.content}</p>
      </div>
    </div>
  );
};
