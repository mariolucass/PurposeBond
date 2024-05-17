import { z } from "zod";

export const commentSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const commentCreateSchema = commentSchema;

export const commentUpdateSchema = commentSchema;

export const commentReturnSchema = commentSchema;
