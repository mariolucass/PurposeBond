"use client";

import { LoadingComponent } from "@/components/common/loading";
import { Navigator } from "@/components/navigator";
import { PostComponent } from "@/components/post";
import { FormCreateComment } from "@/components/post/formCreateComment";
import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { useFetchPost } from "@/hooks/post.hook";
import { CommentsList } from "../../../../components/post/commentsList";

interface PostPageProps {
  params: { id: string };
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
      <Navigator
        name={"Post"}
        description={`@${currentPost.author.username}`}
      />

      <PostComponent post={currentPost} />

      <FormCreateComment />

      <CommentsList postId={id} />
    </section>
  );
};

export default PostPage;
