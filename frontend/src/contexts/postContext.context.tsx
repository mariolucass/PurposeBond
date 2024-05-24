"use client";

import { IChildren } from "@/interfaces/global.interfaces";
import { PostReturnInterface } from "@/interfaces/posts.interfaces";
import { createContext, useContext, useEffect, useState } from "react";

interface IPostContext {
  setCurrentPost: any;
  currentPost: any;
}

const PostContext = createContext<IPostContext>({} as IPostContext);

export const PostProvider = ({ children }: IChildren) => {
  const [currentPost, setCurrentPost] = useState<PostReturnInterface>();

  useEffect(() => {}, []);

  return (
    <PostContext.Provider value={{ currentPost, setCurrentPost }}>
      {children}
    </PostContext.Provider>
  );
};
export const usePostContext = () => useContext(PostContext);
