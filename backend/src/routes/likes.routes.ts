import { Router } from "express";
import { LikesController } from "../controllers/likes.controllers";
import { LikesMiddlewares } from "../middlewares/likes.middlewares";
import { UsersMiddlewares } from "../middlewares/users.middlewares";

export const likesRouter = Router();

likesRouter.post("/:postId", LikesController.postLike);

likesRouter.get("/", LikesController.getLikes);

likesRouter.get(
  "/:id",
  LikesMiddlewares.verifyLikeExistence,
  LikesController.retrieveLike
);

likesRouter.patch(
  "/:id",
  LikesMiddlewares.verifyLikeExistence,
  UsersMiddlewares.confirmUserIdentity,
  LikesController.patchLike
);

likesRouter.delete(
  "/:id",
  LikesMiddlewares.verifyLikeExistence,
  UsersMiddlewares.confirmUserIdentity,
  LikesController.deleteLike
);
