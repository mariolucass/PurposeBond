import { z } from "zod";

export const userSchemaRef = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
});

export const postSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
});

export const postCreateSchema = postSchema.extend({
  author: userSchemaRef,
});

export const postUpdateSchema = postSchema
  .extend({ author: userSchemaRef })
  .partial();

export const postReturnSchema = postSchema.extend({
  author: userSchemaRef,
});
