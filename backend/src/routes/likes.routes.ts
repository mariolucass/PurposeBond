import { Router } from "express";
import { LikesController } from "../controllers/likes.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { LikesMiddlewares } from "../middlewares/likes.middlewares";
import { PostsMiddlewares } from "../middlewares/posts.middlewares";

export const likesRouter = Router();

likesRouter.use(AuthMiddlewares.validateToken);

likesRouter.use("/:id", [PostsMiddlewares.verifyPostExistence]);

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
