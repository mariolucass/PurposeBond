import { z } from "zod";
import { commentReturnSchema } from "./comments.schemas";
import { userSchema } from "./users.schemas";

export const postSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  comments: commentReturnSchema.array(),
});

export const postCreateSchema = postSchema.extend({ author: userSchema });

export const postUpdateSchema = postSchema.extend({ author: userSchema });

export const postReturnSchema = postSchema.extend({ author: userSchema });
