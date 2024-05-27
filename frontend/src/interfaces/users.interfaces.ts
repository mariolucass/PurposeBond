import {
  userCreateSchema,
  userReturnSchema,
  userUpdateSchema,
} from "@/lib/schemas/users.schemas";
import { z } from "zod";

export type UserCreateType = z.infer<typeof userCreateSchema>;
export type UserUpdateType = z.infer<typeof userUpdateSchema>;
export type UserReturnType = z.infer<typeof userReturnSchema>;
export interface UserInterface extends UserReturnType {}
export interface UserContextInterface {}
