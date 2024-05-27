import {
  commentCreateSchema,
  commentReturnSchema,
  commentUpdateSchema,
} from "@/lib/schemas/comments.schemas";
import { z } from "zod";

export type CommentCreateType = z.infer<typeof commentCreateSchema>;
export type CommentUpdateType = z.infer<typeof commentUpdateSchema>;
export type CommentReturnType = z.infer<typeof commentReturnSchema>;
export interface CommentInterface extends CommentReturnType {}
export interface CommentContextInterface {}
