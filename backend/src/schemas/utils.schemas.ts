import { z } from "zod";

export const countPostSchema = z.object({
  reposts: z.number(),
  comments: z.number(),
  views: z.number(),
  likes: z.number(),
});
