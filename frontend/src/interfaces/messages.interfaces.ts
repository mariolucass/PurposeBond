import {
  messageCreateSchema,
  messageReturnSchema,
  messageUpdateSchema,
} from "@/lib/schemas/messages.schemas";
import { z } from "zod";

export type MessageCreateType = z.infer<typeof messageCreateSchema>;
export type MessageUpdateType = z.infer<typeof messageUpdateSchema>;
export type MessageReturnType = z.infer<typeof messageReturnSchema>;
export interface MessageInterface extends MessageReturnType {}
