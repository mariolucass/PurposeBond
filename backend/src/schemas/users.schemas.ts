import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const userReturnSchema = userSchema;
