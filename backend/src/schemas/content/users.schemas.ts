import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  description: z.string().nullable(),
  phone: z.string(),
  address: z.string(),
  password: z.string(),
  profileImage: z.string(),
  joinedAt: z.date(),

  _count: z.object({
    followers: z.number(),
    following: z.number(),
  }),
});

export const userRefSchema = userSchema.pick({
  id: true,
  name: true,
  description: true,
  username: true,
  profileImage: true,
  joinedAt: true,
});

export const userCreateSchema = userSchema;

export const userUpdateSchema = userSchema;

export const userReturnSchema = userSchema.omit({
  password: true,
  email: true,
});
