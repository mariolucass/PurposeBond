import {
  FollowController,
  LikeController,
  PostController,
  UserController,
} from "@/controllers";
import { AuthMiddleware, UsersMiddleware } from "@/middlewares";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/", UserController.getUsers);

usersRouter.use("/:id", UsersMiddleware.verifyUserExistence);

usersRouter.get("/:id", UserController.retrieveUser);

usersRouter.patch(
  "/:id",
  AuthMiddleware.validateToken,
  UsersMiddleware.confirmUserIdentity,
  UserController.patchUser
);

usersRouter.get("/:id/likes", LikeController.getLikesByUser);

usersRouter.get("/:id/posts", PostController.getPostsByUser);

usersRouter.get("/:id/followers", FollowController.getFollowersByUser);

usersRouter.get("/:id/following", FollowController.getFollowingByUser);
