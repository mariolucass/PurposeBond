import {
  userCreateSchema,
  userReturnSchema,
  userUpdateSchema,
} from "@/lib/schemas/users.schemas";
import { z } from "zod";

export type UserCreateInterface = z.infer<typeof userCreateSchema>;
export type UserUpdateInterface = z.infer<typeof userUpdateSchema>;
export type UserReturnInterface = z.infer<typeof userReturnSchema>;

export interface UserContextInterface {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  description: string;
}
