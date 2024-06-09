import { z } from "zod";

export const countSchema = z.object({
  likes: z.number(),
  comments: z.number(),
<<<<<<< HEAD:frontend/src/lib/schemas/utils.schemas.ts
=======
  reposts: z.number(),
  views: z.number(),
>>>>>>> 6e455459b490a52a6a2a68c0b253fcda95d2eeb0:backend/src/schemas/utils.schemas.ts
});
