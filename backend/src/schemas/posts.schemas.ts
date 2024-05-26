import { z } from "zod";
import { userBasicInformationSchema } from "./users.schemas";

const commentInPostSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  author: userBasicInformationSchema,
});

const postSchema = z.object({
  id: z.string(),
  content: z.string().min(1),
  createdAt: z.date(),
  author: userBasicInformationSchema,
});

export const getPostsSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  author: z.object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
  }),
  _count: z.object({
    likes: z.number(),
    comments: z.number(),
  }),
});

export const retrievePostSchema = getPostsSchema.extend({
  comments: commentInPostSchema.array(),
});

export const postWithCommentsSchema = postSchema.extend({
  comments: commentInPostSchema.array(),
});

export const postCreateSchema = postSchema;

export const postUpdateSchema = postSchema;

export const postReturnSchema = postSchema;
