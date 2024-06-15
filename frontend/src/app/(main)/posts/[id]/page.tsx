"use client";

import { PostComponent } from "@/components/post";
import { Separator } from "@/components/ui/separator";
import { usePostContext } from "@/contexts/post.context";

import { useFetchPost } from "@/hooks/post.hook";
import { CommentsList } from "./commentsList";
import { FormCreateComment } from "./formCreateComment";
import { LoadingComponent } from "@/components/loading";

interface PostPageProps {
  params: { id: string };
}
interface Comment {
  content: string;
}

const PostPage = ({ params: { id } }: PostPageProps) => {
  const { currentPost } = usePostContext();
  const { isLoadingCurrentPost, fetchPostError } = useFetchPost(id);

  if (isLoadingCurrentPost) {
    return <LoadingComponent />;
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

      <CommentsList postId={id} />
    </section>
  );
};

export default PostPage;
