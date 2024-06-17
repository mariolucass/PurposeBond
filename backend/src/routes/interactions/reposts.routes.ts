import { Router } from "express";
import { RepostsController } from "../../controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { RepostsMiddlewares } from "../../middlewares/interactions/reposts.middlewares";
import { PostsMiddlewares } from "../../middlewares/resources/posts.middlewares";

export const repostsRouter = Router();

repostsRouter.use(AuthMiddlewares.validateToken);

repostsRouter.use("/:id", PostsMiddlewares.verifyPostExistence);

repostsRouter.post(
  "/:id",
  RepostsMiddlewares.verifyRepostNonExistenceForRepost,
  RepostsController.postRepost
);

repostsRouter.delete(
  "/:id",
  RepostsMiddlewares.verifyRepostExistenceForUnrepost,
  RepostsController.deleteRepost
);
