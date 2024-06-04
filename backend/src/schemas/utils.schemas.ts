import { z } from "zod";

export const countSchema = z.object({
  likes: z.number(),
  comments: z.number(),
  reposts: z.number(),
});
