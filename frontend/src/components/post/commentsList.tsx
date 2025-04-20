import { CommentComponent } from "@/components/comment";
import { LoadingComponent } from "@/components/common/loading";
import { CommentInterface } from "@/interfaces/comments.interfaces";
import { CommentService } from "@/services/comments.services";
import { useEffect, useState } from "react";
import { EmptyComments } from "../_emptyComponents/emptyComments";

export const CommentsList = ({
  postId,
  comments,
  setComments,
}: {
  postId: string;
  comments: CommentInterface[];
  setComments: any;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | unknown>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await CommentService.getByPost(postId);
        setComments(fetchedComments);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Comments not fetched.</div>;
  }

  if (!comments.length) {
    return <EmptyComments />;
  }

  return (
    <ul className="flex flex-col">
      {comments.map((e: CommentInterface) => (
        <CommentComponent comment={e} key={e.id} />
      ))}
    </ul>
  );
};
