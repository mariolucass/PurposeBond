import {
  userCreateSchema,
  userReturnSchema,
  userUpdateSchema,
} from "@/schemas";
import { z } from "zod";

export type UserCreateInterface = z.infer<typeof userCreateSchema>;
export type UserUpdateInterface = z.infer<typeof userUpdateSchema>;
export type UserReturnInterface = z.infer<typeof userReturnSchema>;
