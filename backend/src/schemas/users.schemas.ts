import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  description: z.string(),
  phone: z.string(),
});

export const userBasicInformationSchema = userSchema.omit({
  description: true,
  phone: true,
});

export const userCreateSchema = userSchema;

export const userUpdateSchema = userSchema;

export const userReturnSchema = userSchema;
