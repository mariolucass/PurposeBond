"use client";

import { CommentComponent } from "@/components/comment";
import { PostComponent } from "@/components/post";
import { Separator } from "@/components/ui/separator";
import { usePostContext } from "@/contexts/post.context";

import { useCommentContext } from "@/contexts/comment.context";
import { useFetchPost } from "@/hooks/post.hook";
import { CommentInterface } from "@/interfaces/comments.interfaces";
import { getCommentsByPost } from "@/services/comments.services";
import { Fragment, useEffect, useState } from "react";
import { FormCreateComment } from "./formCreateComment";

interface PostPageProps {
  params: { id: string };
}
interface Comment {
  content: string;
}

const PostPage = ({ params: { id } }: PostPageProps) => {
  const { currentPost } = usePostContext();
  const { isLoadingCurrentPost, fetchPostError } = useFetchPost(id);
  const [isLoading, setIsLoading] = useState(true);
  const { shouldFetchComments, setShouldFetchComments, comments, setComments } =
    useCommentContext();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getCommentsByPost(id);
        setComments(fetchedComments);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (shouldFetchComments) {
      fetchComments();
      setShouldFetchComments(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchComments]);

  if (isLoadingCurrentPost) {
    return <div>Loading...</div>;
  }

  if (fetchPostError || !currentPost) {
    return <div>Post not found.</div>;
  }

  return (
    <section className="gap-4 w-full flex flex-col justify-start">
      <PostComponent post={currentPost} />

      <Separator />

      <div className="w-full flex p-4 ">
        <FormCreateComment />
      </div>

      <ul className="flex flex-col">
        <Separator className="mb-0" />
        {comments.map((e: CommentInterface, index) => (
          <Fragment key={e.id}>
            <CommentComponent comment={e} postId={currentPost.id} />
            {index !== comments.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default PostPage;
