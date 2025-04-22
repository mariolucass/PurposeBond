import {
  commentCreateSchema,
  commentReturnSchema,
  commentUpdateSchema,
} from "@/schemas";
import { z } from "zod";

export type CommentCreateInterface = z.infer<typeof commentCreateSchema>;
export type CommentUpdateInterface = z.infer<typeof commentUpdateSchema>;
export type CommentReturnInterface = z.infer<typeof commentReturnSchema>;
