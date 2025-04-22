"use client";

import { LoadingComponent } from "@/components/common/loading";

import { Navigator } from "@/components/common/navigator";
import { PostNotFound } from "@/components/notFoundStates/postNotFound";
import { PostComponent } from "@/components/post";
import { usePostContext } from "@/contexts/domains/PostDomain/post.context";
import { useFetchPost } from "@/hooks/post.hook";
import { CommentInterface } from "@/interfaces/comments.interfaces";
import { FormCreateComment } from "@/layouts/Forms/formCreateComment";
import { useState } from "react";
import { CommentsList } from "../../../../components/post/commentsList";

interface PostPageProps {
  params: { id: string };
}

const PostPage = ({ params: { id } }: PostPageProps) => {
  const { currentPost } = usePostContext();
  const { isLoadingCurrentPost, fetchPostError } = useFetchPost(id);
  const [comments, setComments] = useState<CommentInterface[]>([]);

  if (isLoadingCurrentPost) {
    return <LoadingComponent />;
  }

  if (fetchPostError || !currentPost) {
    return <PostNotFound />;
  }

  return (
    <section className="w-full flex flex-col justify-start">
      <Navigator
        name={"Post"}
        description={`@${currentPost.author.username}`}
      />

      <PostComponent post={currentPost} />

      <FormCreateComment comments={comments} setComments={setComments} />

      <CommentsList postId={id} comments={comments} setComments={setComments} />
    </section>
  );
};

export default PostPage;
