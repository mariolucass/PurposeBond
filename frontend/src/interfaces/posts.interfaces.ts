import {
  postCreateSchema,
  postReturnSchema,
  postUpdateSchema,
} from "@/schemas/posts.schemas";
import { z } from "zod";

export type PostCreateInterface = z.infer<typeof postCreateSchema>;
export type PostUpdateInterface = z.infer<typeof postUpdateSchema>;
export type PostReturnInterface = z.infer<typeof postReturnSchema>;
