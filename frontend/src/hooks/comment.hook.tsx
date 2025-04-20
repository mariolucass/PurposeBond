import { CommentInterface } from "@/interfaces/comments.interfaces";
import { CommentService } from "@/services/comments.services";
import { useEffect, useState } from "react";
import { useFetchPost } from "./post.hook";

export const useFetchComment = (postId: string, id: string) => {
  const { fetchPostError } = useFetchPost(postId);

  const [comment, setComment] = useState<CommentInterface | null>(null);

  const [isLoadingCurrentComment, setIsLoadingCurrentComment] = useState(
    comment ? false : true
  );
  const [fetchCommentError, setFetchCommentError] = useState<null | unknown>(
    null
  );

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const fetchedComment = await CommentService.getById(id);
        setComment(fetchedComment);
      } catch (error) {
        console.error("Error fetching comment:", error);
        setFetchCommentError(error);
      } finally {
        setIsLoadingCurrentComment(false);
      }
    };

    if (fetchPostError) {
      setFetchCommentError("Post not found");
    } else if (!comment) {
      fetchComment();
    } else {
      setIsLoadingCurrentComment(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { comment, isLoadingCurrentComment, fetchCommentError };
};
