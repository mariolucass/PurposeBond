import { z } from "zod";
import {
  userCreateSchema,
  userReturnSchema,
  userUpdateSchema,
} from "../schemas/users.schemas";

export type UserCreateInterface = z.infer<typeof userCreateSchema>;
export type UserUpdateInterface = z.infer<typeof userUpdateSchema>;
export type UserReturnInterface = z.infer<typeof userReturnSchema>;
