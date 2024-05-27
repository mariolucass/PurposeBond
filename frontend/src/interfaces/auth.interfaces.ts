import { loginSchema, registerSchema } from "@/lib/schemas/auth.schemas";
import { z } from "zod";

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
