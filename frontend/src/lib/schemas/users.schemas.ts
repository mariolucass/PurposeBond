import { z } from "zod";
import { commentSchema } from "./comments.schemas";
import { postSchema } from "./posts.schemas";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  description: z.string(),
  posts: postSchema.array(),
  comments: commentSchema.array(),
});

export const userSchemaInformations = userSchema.omit({
  comments: true,
  posts: true,
});

export const userSchemaWithoutComments = userSchema.omit({ comments: true });

export const userSchemaWithoutPosts = userSchema.omit({ posts: true });

export const userCreateSchema = userSchema;

export const userUpdateSchema = userSchema;

export const userReturnSchema = userSchema;
