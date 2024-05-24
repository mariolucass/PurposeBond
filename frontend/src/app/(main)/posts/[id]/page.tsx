"use client";

import { CommentComponent } from "@/components/comment";
import { PostComponent } from "@/components/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { usePostContext } from "@/contexts/postContext.context";
import useFetchPost from "@/hooks/post.hook";
import { CommentReturnInterface } from "@/interfaces/comments.interfaces";
import { Fragment } from "react";

interface PostPageProps {
  params: { id: string };
}

const PostPage = ({ params: { id } }: PostPageProps) => {
  const { isLoadingCurrentPost, error } = useFetchPost(id);
  const { currentPost } = usePostContext();

  if (isLoadingCurrentPost) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Post not found.</div>;
  }

  return (
    <section className="gap-4 w-full flex flex-col justify-start">
      <PostComponent post={currentPost} />

      <Separator />

      <div className="w-full flex justify-center">
        <div className="w-11/12 flex self-center">
          <Input type="comment" placeholder="Comentario" />
          <Button type="submit">Comentar</Button>
        </div>
      </div>

      <Separator />

      <ul className="flex flex-col gap-8">
        {currentPost.comments.map((e: CommentReturnInterface, index) => (
          <Fragment key={e.id}>
            <CommentComponent comment={e} postId={currentPost.id} />
            {index !== currentPost.comments.length - 1 && <Separator />}
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default PostPage;
