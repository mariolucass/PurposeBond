"use client";

import { usePostContext } from "@/contexts/post.context";
import { PostReturnType } from "@/interfaces/posts.interfaces";
import { ApiError } from "@/services/config/apiError";
import { getPosts } from "@/services/posts.services";
import { useEffect } from "react";
import { PostComponent } from "../../components/post";
import { FormCreatePost } from "./formCreatePost";
import { TabsFeed } from "./tabs";

export const Feed = () => {
  const { posts, setPosts, shouldFetchPosts, setShouldFetchPosts } =
    usePostContext();

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
    if (shouldFetchPosts) {
      fetchPosts();
      setShouldFetchPosts(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchPosts]);

  return (
    <section className="min-w-full w-full flex flex-col justify-start">
      <div className="h-component flex z-20 gap-4 p-4 border-b-2 items-center pl-0">
        <TabsFeed />
      </div>

      <FormCreatePost />

      <ul className="flex flex-col w-full">
        {posts &&
          posts.map((e: PostReturnType) => (
            <PostComponent post={e} key={e.id} />
          ))}
      </ul>
    </section>
  );
};
