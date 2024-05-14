import { z } from "zod";
import { userReturnSchema } from "./users.schemas";

const postSchema = z.object({
  id: z.string(),
  content: z.string().min(1),
  createdAt: z.date(),
  author: userReturnSchema,
});

export const postReturnSchema = postSchema;
