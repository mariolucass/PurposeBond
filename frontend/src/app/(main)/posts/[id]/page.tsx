"use client";

import { PostComponent } from "@/components/post";
import { usePostContext } from "@/contexts/domains/PostDomain/post.context";

import { LoadingComponent } from "@/components/loading";
import { Navigator } from "@/components/navigator";
import { FormCreateComment } from "@/components/post/formCreateComment";
import { useFetchPost } from "@/hooks/post.hook";
import { CommentsList } from "../../../../components/post/commentsList";

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
