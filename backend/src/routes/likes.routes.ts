import { Router } from "express";
import { LikesController } from "../controllers/likes.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { LikesMiddlewares } from "../middlewares/likes.middlewares";
import { UsersMiddlewares } from "../middlewares/users.middlewares";

export const likesRouter = Router();

likesRouter.use(AuthMiddlewares.validateToken);

likesRouter.post("/:postId", LikesController.postLike);

likesRouter.use("/:id", [
  LikesMiddlewares.verifyLikeExistence,
  UsersMiddlewares.confirmUserIdentity,
]);

likesRouter.delete("/:id", LikesController.deleteLike);
