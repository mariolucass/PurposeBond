import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(4),
});

export const registerSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
});
