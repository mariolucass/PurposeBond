"use client";

import { CommentComponent } from "@/components/comment";
import useFetchPost from "@/hooks/post.hook";
import { CommentInterface } from "@/interfaces/comments.interfaces";

import { api } from "@/services/config/api";

import { useEffect, useState } from "react";

interface CommentPageProps {
  params: { id: string; commentId: string };
}

const CommentPage = ({ params: { id, commentId } }: CommentPageProps) => {
  const {} = useFetchPost(id);
  const [comment, setComment] = useState<CommentInterface>(
    {} as CommentInterface
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await api.get(`/comments/${commentId}`);
        setComment(response.data);
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
    <section className="gap-4 flex flex-col justify-start">
      <CommentComponent comment={comment} />
    </section>
  );
};

export default CommentPage;
