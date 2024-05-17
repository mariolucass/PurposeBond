import { z } from "zod";

const followSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const followCreateSchema = followSchema;

export const followUpdateSchema = followSchema;

export const followReturnSchema = followSchema;
