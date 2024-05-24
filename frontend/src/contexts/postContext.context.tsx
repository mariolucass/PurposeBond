"use client";

import { IChildren } from "@/interfaces/global.interfaces";
import {
  PostContextInterface,
  PostInterface,
} from "@/interfaces/posts.interfaces";
import { createContext, useContext, useState } from "react";

const PostContext = createContext<PostContextInterface>(
  {} as PostContextInterface
);

export const PostProvider = ({ children }: IChildren) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const [currentPost, setCurrentPost] = useState<PostInterface>(
    {} as PostInterface
  );

  return (
    <PostContext.Provider
      value={{ currentPost, setCurrentPost, posts, setPosts }}
    >
      {children}
    </PostContext.Provider>
  );
};
export const usePostContext = () => useContext(PostContext);
