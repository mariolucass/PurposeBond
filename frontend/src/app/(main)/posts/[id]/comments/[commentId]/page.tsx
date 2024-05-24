"use client";

import { PostComponent } from "@/components/post";
import useFetchPost from "@/hooks/post.hook";
import { CommentReturnInterface } from "@/interfaces/comments.interfaces";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

interface CommentPageProps {
  params: { id: string; commentId: string };
}

const CommentPage = ({ params: { id, commentId } }: CommentPageProps) => {
  const {} = useFetchPost(id);
  const [comment, setComment] = useState<CommentReturnInterface>(
    {} as CommentReturnInterface
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await api.get(`/comments/${commentId}`);
        setComment(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getComment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!comment) {
    return <div>Comment not found.</div>;
  }

  return (
    <section className="border-x-4 gap-4 w-4/6 flex flex-col justify-start">
      <PostComponent post={comment} />
    </section>
  );
};

export default CommentPage;
