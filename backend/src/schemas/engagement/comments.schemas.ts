import { z } from "zod";
import { userRefSchema } from "../";

const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),

  author: userRefSchema,
});

export const commentRefSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export const commentCreateSchema = commentSchema
  .extend({ authorId: z.string(), postId: z.string() })
  .pick({ content: true, authorId: true, postId: true });

export const commentUpdateSchema = commentCreateSchema.partial();

export const commentReturnSchema = commentSchema;
