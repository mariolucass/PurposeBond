import { z } from "zod";

const messageSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().nullish(),
  brand: z.string(),
  year: z.number().positive(),
  km: z.number().positive(),
});

export const messageReturnSchema = messageSchema;
