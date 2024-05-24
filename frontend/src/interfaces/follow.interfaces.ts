import {
  followCreateSchema,
  followReturnSchema,
  followUpdateSchema,
} from "@/lib/schemas/follow.schemas";
import { z } from "zod";

export type FollowCreateInterface = z.infer<typeof followCreateSchema>;
export type FollowUpdateInterface = z.infer<typeof followUpdateSchema>;
export type FollowReturnInterface = z.infer<typeof followReturnSchema>;

export interface FollowContextInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  description: string;
}
