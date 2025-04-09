"use client";
import { CommentInterface } from "@/interfaces/comments.interfaces";
import { ChildrenInterface } from "@/interfaces/global.interfaces";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ICommentContext {
  comments: CommentInterface[];
  setComments: Dispatch<SetStateAction<CommentInterface[]>>;

  shouldFetchComments: boolean;
  setShouldFetchComments: Dispatch<SetStateAction<boolean>>;

  currentComment: CommentInterface | null;
  setCurrentComment: Dispatch<SetStateAction<CommentInterface | null>>;
}

const CommentContext = createContext<ICommentContext>({} as ICommentContext);

export const CommentProvider = ({ children }: ChildrenInterface) => {
  const [currentComment, setCurrentComment] = useState<CommentInterface | null>(
    null
  );
  const [comments, setComments] = useState<CommentInterface[]>([]);

  const [shouldFetchComments, setShouldFetchComments] = useState(
    !comments.length
  );

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,

        shouldFetchComments,
        setShouldFetchComments,

        currentComment,
        setCurrentComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => useContext(CommentContext);
