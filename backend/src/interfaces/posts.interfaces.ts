import { z } from "zod";
import {
  postCreateSchema,
  postReturnSchema,
  postUpdateSchema,
} from "../schemas/posts.schemas";

export type PostCreateInterface = z.infer<typeof postCreateSchema>;
export type PostUpdateInterface = z.infer<typeof postUpdateSchema>;
export type PostReturnInterface = z.infer<typeof postReturnSchema>;
