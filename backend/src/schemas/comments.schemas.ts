import { z } from "zod";
import { userReturnSchema } from "./users.schemas";

const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  author: userReturnSchema,
});

export const commentReturnSchema = commentSchema;
