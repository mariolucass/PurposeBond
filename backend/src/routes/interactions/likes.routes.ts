import { Router } from "express";
import { LikesController } from "../../controllers/interactions/likes.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { LikesMiddlewares } from "../../middlewares/interactions/likes.middlewares";
import { PostsMiddlewares } from "../../middlewares/resources/posts.middlewares";

export const likesRouter = Router();

likesRouter.use(AuthMiddlewares.validateToken);

likesRouter.use("/:id", PostsMiddlewares.verifyPostExistence);

likesRouter.post(
  "/:id",
  LikesMiddlewares.verifyLikeNonExistenceForLike,
  LikesController.postLike
);

likesRouter.delete(
  "/:id",
  LikesMiddlewares.verifyLikeExistenceForUnlike,
  LikesController.deleteLike
);
