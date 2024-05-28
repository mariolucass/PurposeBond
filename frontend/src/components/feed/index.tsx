"use client";

import { usePostContext } from "@/contexts/post.context";
import { PostReturnType } from "@/interfaces/posts.interfaces";
import { ApiError } from "@/services/config/apiError";
import { getPosts } from "@/services/posts.services";
import { Fragment, useEffect } from "react";
import { PostComponent } from "../post";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

export const Feed = () => {
  const { posts, setPosts } = usePostContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        if (error instanceof ApiError) {
          console.error(error);
        }
      }
    };

    if (!posts.length) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postsRender = posts.map((e: PostReturnType, index) => (
    <Fragment key={e.id}>
      <PostComponent post={e} />
      {index !== posts.length - 1 && <Separator />}
    </Fragment>
  ));

  return (
    <section className="gap-4 min-w-full w-full flex flex-col justify-start">
      <div className="grid w-full gap-2 p-6">
        <Textarea placeholder="Type your post here." />
        <Button onClick={() => {}}>Post</Button>
      </div>

      <Separator />

      <ul className="flex flex-col w-full">{posts && postsRender}</ul>
    </section>
  );
};
