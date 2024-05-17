import { z } from "zod";
import { userSchema } from "./users.schemas";

export const postSchema = z.object({
  content: z.string(),
  createdAt: z.date(),
});

export const postCreateSchema = postSchema.extend({ author: userSchema });

export const postUpdateSchema = postSchema.extend({ author: userSchema });

export const postReturnSchema = postSchema.extend({ author: userSchema });
