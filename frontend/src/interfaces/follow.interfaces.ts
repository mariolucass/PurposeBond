import {
  followCreateSchema,
  followReturnSchema,
  followUpdateSchema,
} from "@/lib/schemas/follow.schemas";
import { z } from "zod";

export type FollowCreateType = z.infer<typeof followCreateSchema>;
export type FollowUpdateType = z.infer<typeof followUpdateSchema>;
export type FollowReturnType = z.infer<typeof followReturnSchema>;
export interface FollowInterface extends FollowReturnType {}
export interface FollowContextInterface {}
