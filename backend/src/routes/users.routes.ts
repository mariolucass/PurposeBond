import { Router } from "express";
import { FollowController } from "../controllers/follow.controllers";
import { LikesController } from "../controllers/likes.controllers";
import { PostsController } from "../controllers/posts.controllers";
import { UsersController } from "../controllers/users.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { UsersMiddlewares } from "../middlewares/users.middlewares";

export const usersRouter = Router();

usersRouter.get("/", UsersController.getUsers);

usersRouter.use("/:id", UsersMiddlewares.verifyUserExistence);

usersRouter.get("/:id", UsersController.retrieveUser);

usersRouter.get("/:id/likes", LikesController.getLikesByUser);

usersRouter.get("/:id/posts", PostsController.getPostsByUser);

usersRouter.get("/:id/media", FollowController.getFollowingUsers);

usersRouter.use("/:id", [
  AuthMiddlewares.validateToken,
  UsersMiddlewares.confirmUserIdentity,
]);

usersRouter.patch("/:id", UsersController.patchUser);

usersRouter.delete("/:id", UsersController.deleteUser);

usersRouter.use("/:id", UsersMiddlewares.verifyUserExistence);


