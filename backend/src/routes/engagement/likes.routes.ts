import { LikeController } from "@/controllers";
import {
  AuthMiddleware,
  LikesMiddleware,
  PostsMiddleware,
} from "@/middlewares";
import { Router } from "express";

export const likesRouter = Router();

likesRouter.use(AuthMiddleware.validateToken);

likesRouter.use("/:id", PostsMiddleware.verifyPostExistence);

likesRouter.post(
  "/:id",
  LikesMiddleware.verifyLikeNonExistenceForLike,
  LikeController.postLike
);

likesRouter.delete(
  "/:id",
  LikesMiddleware.verifyLikeExistenceForUnlike,
  LikeController.deleteLike
);
