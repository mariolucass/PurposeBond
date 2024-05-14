import { IChildren } from "@/interfaces/global";
import { createContext, useContext } from "react";

interface ICommentContext {}

const CommentContext = createContext<ICommentContext>({} as ICommentContext);

export const CommentProvider = ({ children }: IChildren) => {
  const createComment = () => {};

  const deleteComment = () => {};

  const editComment = () => {};

  return (
    <CommentContext.Provider value={{}}>{children}</CommentContext.Provider>
  );
};

export const useCommentContext = () => useContext(CommentContext);
