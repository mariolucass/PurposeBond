import { InsightController } from "@/controllers";
import { AuthMiddleware } from "@/middlewares";
import { Router } from "express";

export const insightRouter = Router();

insightRouter.use(AuthMiddleware.validateToken);

insightRouter.get("/total/users", InsightController.getTotalUsers);
insightRouter.get("/total/posts", InsightController.getTotalPosts);
insightRouter.get("/total/likes", InsightController.getTotalLikes);
insightRouter.get("/total/comments", InsightController.getTotalComments);
insightRouter.get("/total/reposts", InsightController.getTotalReposts);

insightRouter.get("/top/posts/likes", InsightController.getTopPostsByLikes);
insightRouter.get(
  "/top/posts/comments",
  InsightController.getTopPostsByComments
);
insightRouter.get("/top/communities", InsightController.getTopCommunities);
