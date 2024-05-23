import { z } from "zod";
import { commentSchema } from "./comments.schemas";
import { postSchema } from "./posts.schemas";

export const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  description: z.string(),
  posts: postSchema.array(),
  comments: commentSchema.array(),
});

export const userCreateSchema = userSchema;

export const userUpdateSchema = userSchema;

export const userReturnSchema = userSchema;
