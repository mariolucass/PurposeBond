import {
  messageCreateSchema,
  messageReturnSchema,
  messageUpdateSchema,
} from "@/schemas";
import { z } from "zod";

export type MessageCreateInterface = z.infer<typeof messageCreateSchema>;
export type MessageUpdateInterface = z.infer<typeof messageUpdateSchema>;
export type MessageReturnInterface = z.infer<typeof messageReturnSchema>;
