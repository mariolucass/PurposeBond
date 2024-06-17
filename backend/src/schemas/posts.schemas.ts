import { z } from "zod";
import { userRefSchema } from "./users.schemas";
import { countPostSchema } from "./utils.schemas";

const postSchema = z.object({
  id: z.string(),
  content: z.string().min(1),
  createdAt: z.date(),

  author: userRefSchema,
  _count: countPostSchema,
});

export const postRefSchema = postSchema.omit({ author: true });

export const postCreateSchema = postSchema.pick({ content: true });

export const postUpdateSchema = postCreateSchema.optional();

export const postReturnSchema = postSchema;
