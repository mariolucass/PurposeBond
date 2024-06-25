"use client";

import { PostComponent } from "@/components/post";
import { usePostContext } from "@/contexts/post.context";

import { LoadingComponent } from "@/components/loading";
import { Navigator } from "@/components/navigator";
import { useFetchPost } from "@/hooks/post.hook";
import { CommentsList } from "./commentsList";
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

  if (isLoadingCurrentPost) {
    return <LoadingComponent />;
  }

  if (fetchPostError || !currentPost) {
    return <div>Post not found.</div>;
  }

  return (
    <section className="w-full flex flex-col justify-start">
      <Navigator name={"Post"} />

      <PostComponent post={currentPost} />

      <div className="w-full flex p-4">
        <FormCreateComment />
      </div>

      <CommentsList postId={id} />
    </section>
  );
};

export default PostPage;
