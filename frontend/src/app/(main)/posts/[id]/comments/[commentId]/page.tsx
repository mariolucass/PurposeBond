"use client";

import { CommentComponent } from "@/components/comment";
import { useCommentContext } from "@/contexts/comment.context";
import { useFetchComment } from "@/hooks/comment.hook";

interface CommentPageProps {
  params: { id: string; commentId: string };
}

const CommentPage = ({ params: { id, commentId } }: CommentPageProps) => {
  const { isLoadingCurrentComment, fetchCommentError } = useFetchComment(
    id,
    commentId
  );

  const { currentComment } = useCommentContext();

  if (isLoadingCurrentComment) {
    return <div>Loading...</div>;
  }

  if (fetchCommentError) {
    return <div>Comment not found.</div>;
  }

  return (
    <section className="gap-4 flex flex-col justify-start">
      <CommentComponent comment={currentComment} />
    </section>
  );
};

export default CommentPage;
