import { z } from "zod";
import { userRefSchema } from "./users.schemas";

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

export const commentCreateSchema = commentSchema.pick({ content: true });

export const commentUpdateSchema = commentCreateSchema.partial();

export const commentReturnSchema = commentSchema;
