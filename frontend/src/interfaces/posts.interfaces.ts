import {
  postCreateSchema,
  postReturnSchema,
  postUpdateSchema,
} from "@/lib/schemas/posts.schemas";
import { z } from "zod";

export type PostCreateType = z.infer<typeof postCreateSchema>;
export type PostUpdateType = z.infer<typeof postUpdateSchema>;
export type PostReturnType = z.infer<typeof postReturnSchema>;
export interface PostInterface extends PostReturnType {}
