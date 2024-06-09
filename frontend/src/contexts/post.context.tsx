"use client";

import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { PostInterface } from "@/interfaces/posts.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface IPostContext {
  currentPost: PostInterface | null;
  setCurrentPost: Dispatch<SetStateAction<PostInterface | null>>;

  posts: PostInterface[];
  setPosts: Dispatch<SetStateAction<PostInterface[]>>;

  shouldFetchPosts: boolean;
  setShouldFetchPosts: Dispatch<SetStateAction<boolean>>;
}

const PostContext = createContext<IPostContext>({} as IPostContext);

export const PostProvider = ({ children }: ChildrenInterface) => {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [shouldFetchPosts, setShouldFetchPosts] = useState(!posts.length);
  const [currentPost, setCurrentPost] = useState<PostInterface | null>(null);

  return (
    <PostContext.Provider
      value={{
        currentPost,
        setCurrentPost,

        posts,
        setPosts,

        shouldFetchPosts,
        setShouldFetchPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export const usePostContext = () => useContext(PostContext);
