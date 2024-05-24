import {
  postCreateSchema,
  postReturnSchema,
  postUpdateSchema,
} from "@/lib/schemas/posts.schemas";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type PostCreateInterface = z.infer<typeof postCreateSchema>;
export type PostUpdateInterface = z.infer<typeof postUpdateSchema>;
export type PostReturnInterface = z.infer<typeof postReturnSchema>;

export interface PostInterface extends PostReturnInterface {}

export interface PostContextInterface {
  currentPost: PostInterface;
  setCurrentPost: Dispatch<SetStateAction<PostInterface>>;
  posts: PostInterface[];
  setPosts: Dispatch<SetStateAction<PostInterface[]>>;
}
