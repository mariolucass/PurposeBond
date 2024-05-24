"use client";

import { CommentComponent } from "@/components/comment";
import { PostComponent } from "@/components/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { usePostContext } from "@/contexts/postContext.context";
import useFetchPost from "@/hooks/post.hook";
import { CommentReturnInterface } from "@/interfaces/comments.interfaces";

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
    <section className="border-x-4 gap-4 w-4/6 flex flex-col justify-start">
      <PostComponent post={currentPost} />

      <Separator />

      <div className="w-full flex justify-center">
        <div className="w-11/12 flex self-center">
          <Input type="comment" placeholder="Comentario" />
          <Button type="submit">Comentar</Button>
        </div>
      </div>

      <Separator />

      <ul>
        {currentPost.comments.map((e: CommentReturnInterface) => (
          <CommentComponent comment={e} postId={currentPost.id} key={e.id} />
        ))}
      </ul>
    </section>
  );
};

export default PostPage;
