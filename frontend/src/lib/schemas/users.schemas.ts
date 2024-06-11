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

  _count: z.object({
    followers: z.number(),
    following: z.number(),
  }),
});

export const userRefSchema = userSchema.pick({
  id: true,
  name: true,
  username: true,
});

// export const userFullSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   username: z.string(),
//   email: z.string(),
//   description: z.string(),
//   phone: z.string(),

//   posts: postRefSchema.array(),
//   comments: commentRefSchema.array(),
//   likes: postRefSchema.array(),

//   _count: z.object({
//     Followers: z.number(),
//     following: z.number(),
//   }),
// });

export const userCreateSchema = userSchema;

export const userUpdateSchema = userSchema;

export const userReturnSchema = userSchema.omit({
  password: true,
  email: true,
});
