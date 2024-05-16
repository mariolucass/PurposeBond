import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";

export type LoginInterface = z.infer<typeof loginSchema>;
export type RegisterInterface = z.infer<typeof registerSchema>;
