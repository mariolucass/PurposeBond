import { CommentComponent } from "@/components/comment";
import { LoadingComponent } from "@/components/loading";
import { useCommentContext } from "@/contexts/domains/PostDomain/comment.context";
import { CommentInterface } from "@/interfaces/comments.interfaces";
import { getCommentsByPost } from "@/services/comments.services";
import { useEffect, useState } from "react";

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

  if (!comments.length) {
  }

  return (
    <ul className="flex flex-col">
      {comments.map((e: CommentInterface) => (
        <CommentComponent comment={e} />
      ))}
    </ul>
  );
};
