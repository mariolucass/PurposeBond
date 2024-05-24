import {
  commentCreateSchema,
  commentReturnSchema,
  commentUpdateSchema,
} from "@/lib/schemas/comments.schemas";
import { z } from "zod";

export type CommentCreateInterface = z.infer<typeof commentCreateSchema>;
export type CommentUpdateInterface = z.infer<typeof commentUpdateSchema>;
export type CommentReturnInterface = z.infer<typeof commentReturnSchema>;

export interface CommentContextInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  description: string;
}
