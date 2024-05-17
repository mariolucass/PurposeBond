import {
  followCreateSchema,
  followReturnSchema,
  followUpdateSchema,
} from "@/schemas/follow.schemas";
import { z } from "zod";

export type FollowCreateInterface = z.infer<typeof followCreateSchema>;
export type FollowUpdateInterface = z.infer<typeof followUpdateSchema>;
export type FollowReturnInterface = z.infer<typeof followReturnSchema>;
