import { RepostController } from "@/controllers";
import {
  AuthMiddleware,
  PostsMiddleware,
  RepostsMiddleware,
} from "@/middlewares";
import { Router } from "express";

export const repostsRouter = Router();

repostsRouter.use(AuthMiddleware.validateToken);

repostsRouter.use("/:id", PostsMiddleware.verifyPostExistence);

repostsRouter.post(
  "/:id",
  RepostsMiddleware.verifyRepostNonExistenceForRepost,
  RepostController.postRepost
);

repostsRouter.delete(
  "/:id",
  RepostsMiddleware.verifyRepostExistenceForUnrepost,
  RepostController.deleteRepost
);
