import { Router } from "express";
import { LikesController } from "../../controllers/interactions/likes.controllers";
import { PostsController } from "../../controllers/resources/posts.controllers";
import { UsersController } from "../../controllers/resources/users.controllers";
import { FollowController } from "../../controllers/social/follow.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { UsersMiddlewares } from "../../middlewares/resources/users.middlewares";

export const usersRouter = Router();

usersRouter.get("/", UsersController.getUsers);

usersRouter.use("/:id", UsersMiddlewares.verifyUserExistence);

usersRouter.get("/:id", UsersController.retrieveUser);

usersRouter.patch(
  "/:id",
  AuthMiddlewares.validateToken,
  UsersMiddlewares.confirmUserIdentity,
  UsersController.patchUser
);

usersRouter.get("/:id/likes", LikesController.getLikesByUser);

usersRouter.get("/:id/posts", PostsController.getPostsByUser);

usersRouter.get("/:id/followers", FollowController.getFollowersByUser);

usersRouter.get("/:id/following", FollowController.getFollowingByUser);

// usersRouter.delete(
//   "/:id",
//   UsersMiddlewares.confirmUserIdentity,
//   UsersController.deleteUser
// );
