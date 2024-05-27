import { ChildrenInterface } from "@/interfaces/global.interfaces";
import { createContext, useContext } from "react";

interface ILikeContext {}

const LikeContext = createContext<ILikeContext>({} as ILikeContext);

export const LikeProvider = ({ children }: ChildrenInterface) => {
  const likePost = (postId: string) => {};

  const unlikePost = (postId: string) => {};

  return <LikeContext.Provider value={{}}>{children}</LikeContext.Provider>;
};

export const useLikeContext = () => useContext(LikeContext);
