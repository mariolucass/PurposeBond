import { z } from "zod";

const userInformation = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  description: z.string(),
});

export const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export const commentCreateSchema = commentSchema.pick({ content: true });

export const commentUpdateSchema = commentCreateSchema;

export const commentReturnSchema = commentSchema.extend({
  author: userInformation,
});
