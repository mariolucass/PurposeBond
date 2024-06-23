"use client";

import { CommentComponent } from "@/components/comment";
import { LoadingComponent } from "@/components/loading";
import { Navigator } from "@/components/navigator";
import { Separator } from "@/components/ui/separator";
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
    return <LoadingComponent />;
  }

  if (fetchCommentError) {
    return <div>Comment not found.</div>;
  }

  return (
    <section className="gap-4 flex flex-col justify-start">
      <Navigator name={"Comment"} />

      <div className="w-full flex">
        <Separator orientation="vertical" />

        <div className="ml-12 w-full">
          <CommentComponent comment={currentComment} />
        </div>
      </div>
    </section>
  );
};

export default CommentPage;
