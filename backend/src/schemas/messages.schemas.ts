import { z } from "zod";
import { userReturnSchema } from "./users.schemas";

const messageSchema = z.object({
  id: z.string(),
  content: z.string(),
  receiver: userReturnSchema,
  sender: userReturnSchema,
});

export const messageReturnSchema = messageSchema;
