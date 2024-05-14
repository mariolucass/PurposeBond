import { IChildren } from "@/interfaces/global";
import { createContext, useContext, useEffect } from "react";

interface IPostContext {}

const PostContext = createContext<IPostContext>({} as IPostContext);

export function PostProvider({ children }: IChildren) {
  const loadPosts = () => {};

  useEffect(() => {}, []);

  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
}
export const usePostContext = () => useContext(PostContext);
