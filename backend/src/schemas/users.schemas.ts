import { z } from "zod";
import { commentRefSchema } from "./comments.schemas";
import { postRefSchema } from "./posts.schemas";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  description: z.string(),
  phone: z.string(),
  password: z.string(),
});

export const userRefSchema = userSchema.pick({
  id: true,
  name: true,
  username: true,
});

export const userFullSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  description: z.string(),
  phone: z.string(),

  posts: postRefSchema.array(),
  comments: commentRefSchema.array(),
  likes: postRefSchema.array(),
  followers: userRefSchema.array(),
  following: userRefSchema.array(),
});

export const userCreateSchema = userSchema;

export const userUpdateSchema = userSchema;

export const userReturnSchema = userSchema.omit({ password: true });
