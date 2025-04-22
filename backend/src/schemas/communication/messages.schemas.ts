import { z } from "zod";
import { userRefSchema } from "../";

const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),

  receiver: userRefSchema,
  sender: userRefSchema,
});

export const messageReturnSchema = messageSchema;

export const messageCreateSchema = messageSchema.pick({ content: true });

export const messageUpdateSchema = messageCreateSchema.partial();
