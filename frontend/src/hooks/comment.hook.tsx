import { useCommentContext } from "@/contexts/domains/PostDomain/comment.context";
import { getComment } from "@/services/comments.services";
import { useEffect, useState } from "react";
import { useFetchPost } from "./post.hook";

export const useFetchComment = (postId: string, id: string) => {
  const { fetchPostError } = useFetchPost(postId);

  const { currentComment, setCurrentComment } = useCommentContext();

  const [isLoadingCurrentComment, setIsLoadingCurrentComment] = useState(
    currentComment ? false : true
  );
  const [fetchCommentError, setFetchCommentError] = useState<null | unknown>(
    null
  );

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const fetchedComment = await getComment(id);
        setCurrentComment(fetchedComment);
      } catch (error) {
        console.error("Error fetching comment:", error);
        setFetchCommentError(error);
      } finally {
        setIsLoadingCurrentComment(false);
      }
    };

    if (fetchPostError) {
      setFetchCommentError("Post not found");
    } else if (!currentComment) {
      fetchComment();
    } else {
      setIsLoadingCurrentComment(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoadingCurrentComment, fetchCommentError };
};
