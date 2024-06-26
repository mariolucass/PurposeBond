import { z } from "zod";

export const loginSchema = z.union([
  z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  }),
  z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    password: z.string(),
  }),
]);

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
});
