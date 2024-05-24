import { z } from "zod";
import { userSchema } from "./users.schemas";

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

export const commentCreateSchema = commentSchema.extend({ author: userSchema });

export const commentUpdateSchema = commentSchema.extend({ author: userSchema });

export const commentReturnSchema = commentSchema.extend({
  author: userInformation,
});
