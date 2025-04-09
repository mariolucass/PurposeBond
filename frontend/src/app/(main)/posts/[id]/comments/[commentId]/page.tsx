"use client";

import { CommentComponent } from "@/components/comment";
import { LoadingComponent } from "@/components/loading";
import { Navigator } from "@/components/navigator";
import { PostAuthorInfo } from "@/components/post/authorInfo";
import { Separator } from "@/components/ui/separator";
import { useCommentContext } from "@/contexts/domains/PostDomain/comment.context";
import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
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

  const { currentPost } = usePostContext();

  if (isLoadingCurrentComment) {
    return <LoadingComponent />;
  }

  if (fetchCommentError) {
    return <div>Comment not found.</div>;
  }

  if (!currentPost) return null;

  return (
    <section className="gap-4 flex flex-col justify-start">
      <Navigator name={"Comment"} />
      <div className="mt-2 p-3 border rounded-xl bg-background text-sm ">
        <div className="mb-1 font-semibold">Comentando sobre:</div>

        <div className="flex flex-col gap-1 ml-2">
          <PostAuthorInfo
            author={currentPost.author}
            createdAt={currentPost.createdAt}
          />

          <p className="max-w-full ml-14">{currentPost.content}</p>
        </div>
      </div>

      <div className="w-full flex">
        <Separator orientation="vertical" />

        <div className=" w-full">
          <CommentComponent comment={currentComment} />
        </div>
      </div>
    </section>
  );
};

export default CommentPage;
