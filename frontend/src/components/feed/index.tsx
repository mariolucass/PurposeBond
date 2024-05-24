"use client";

import { PostReturnInterface } from "@/interfaces/posts.interfaces";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { PostComponent } from "../post";

export const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!posts.length) {
      const getPosts = async () => {
        const response: any = await api.get("/posts");
        setPosts(response.data);
      };
      getPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postsRender = posts.map((e: PostReturnInterface) => (
    <PostComponent post={e} key={e.id} />
  ));

  return <ul className="flex flex-col w-full">{posts && postsRender}</ul>;
};
