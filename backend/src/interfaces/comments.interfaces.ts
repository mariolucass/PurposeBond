import { z } from "zod";
import {
  commentCreateSchema,
  commentReturnSchema,
  commentUpdateSchema,
} from "../schemas/comments.schemas";

export type CommentCreateInterface = z.infer<typeof commentCreateSchema>;
export type CommentUpdateInterface = z.infer<typeof commentUpdateSchema>;
export type CommentReturnInterface = z.infer<typeof commentReturnSchema>;
