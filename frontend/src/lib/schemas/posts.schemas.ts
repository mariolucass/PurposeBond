import { z } from "zod";

import { countSchema } from "./utils.schemas";

const userRefSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  profileImage: z.string(),
});

const postSchema = z.object({
  id: z.string(),
  content: z.string().min(1),
  createdAt: z.date(),

  author: userRefSchema,
  _count: countSchema,
});

export const postRefSchema = postSchema.omit({ author: true });

export const postCreateSchema = postSchema.pick({ content: true });

export const postUpdateSchema = postCreateSchema.optional();

export const postReturnSchema = postSchema;
