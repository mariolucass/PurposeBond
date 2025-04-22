"use client";

import { CommentComponent } from "@/components/comment";
import { LoadingComponent } from "@/components/common/loading";
import { Navigator } from "@/components/common/navigator";
import { PostComponent } from "@/components/post";
import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { useFetchComment } from "@/hooks/comment.hook";

interface CommentPageProps {
  params: { id: string; commentId: string };
}

const CommentPage = ({ params: { id, commentId } }: CommentPageProps) => {
  const { comment, isLoadingCurrentComment, fetchCommentError } =
    useFetchComment(id, commentId);

  const { currentPost } = usePostContext();

  if (isLoadingCurrentComment) return <LoadingComponent />;
  if (fetchCommentError) return <div>Comment not found.</div>;
  if (!currentPost || !comment) return null;

  return (
    <section className="flex flex-col gap-2">
      <Navigator name="Comment" description={`@${comment.author.username}`} />

      <div className="opacity-50">
        <PostComponent post={currentPost} />
      </div>

      <div className=" ">
        <CommentComponent comment={comment} />
      </div>
    </section>
  );
};

export default CommentPage;
