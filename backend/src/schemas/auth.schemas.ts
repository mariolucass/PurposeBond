import { z } from "zod";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
});
