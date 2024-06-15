import { useAuthContext } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { CommentAuthorInfo } from "./authorInfo";
import { CommentInteractions } from "./interactions";

export const CommentComponent = ({ comment, postId }: any) => {
  const router = useRouter();
  const authorInfoRef = useRef<HTMLDivElement>(null);
  const interactionsRef = useRef<HTMLDivElement>(null);

  const { verifyOwnership } = useAuthContext();

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
      className="w-full flex flex-col p-4 bg-white rounded-lg"
      onClick={handleCommentContentClick}
    >
      <div className="flex flex-col space-y-4 gap-4">
        <div>
          <CommentAuthorInfo
            author={comment.author}
            createdAt={comment.createdAt}
          />
        </div>

        <p className="text-gray-800">{comment.content}</p>

        <CommentInteractions commentId={comment.id} count={comment._count} />
      </div>
    </div>
  );
};
