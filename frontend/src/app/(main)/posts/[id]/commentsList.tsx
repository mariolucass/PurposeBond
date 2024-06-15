import { CommentComponent } from "@/components/comment";
import { LoadingComponent } from "@/components/loading";
import { Separator } from "@/components/ui/separator";
import { useCommentContext } from "@/contexts/comment.context";
import { CommentInterface } from "@/interfaces/comments.interfaces";
import { getCommentsByPost } from "@/services/comments.services";
import { Fragment, useEffect, useState } from "react";

export const CommentsList = ({ postId }: { postId: string }) => {
  const { shouldFetchComments, setShouldFetchComments, comments, setComments } =
    useCommentContext();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsByPost(postId);
        setComments(fetchedComments);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (shouldFetchComments) {
      fetchComments();
      setShouldFetchComments(false);
    } else {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchComments]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Comments not fetched.</div>;
  }

  return (
    <ul className="flex flex-col">
      <Separator className="mb-0" />
      {comments.map((e: CommentInterface, index) => (
        <Fragment key={e.id}>
          <CommentComponent comment={e} postId={postId} />
          {index !== comments.length - 1 && <Separator />}
        </Fragment>
      ))}
    </ul>
  );
};
