import { loginSchema, registerSchema } from "@/schemas/auth.schemas";
import { z } from "zod";

export type LoginInterface = z.infer<typeof loginSchema>;
export type RegisterInterface = z.infer<typeof registerSchema>;
