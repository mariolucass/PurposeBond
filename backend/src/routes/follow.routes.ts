import { Router } from "express";
import { FollowController } from "../controllers/follow.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { FollowMiddlewares } from "../middlewares/follow.middleware";
import { UsersMiddlewares } from "../middlewares/users.middlewares";

export const followRouter = Router();

followRouter.use(AuthMiddlewares.validateToken);

followRouter.get("/recommended", FollowController.getRecommendedUsers);

followRouter.get("/followers", FollowController.getFollowedUsers);

followRouter.get("/following", FollowController.getFollowingUsers);

followRouter.use("/follow/:id", [
  UsersMiddlewares.verifyUserExistence,
  FollowMiddlewares.preventSelfFollow,
]);

followRouter.patch(
  "/follow/:id",
  FollowMiddlewares.verifyFollowNonExistenceForFollow,
  FollowController.followUser
);

followRouter.delete(
  "/follow/:id",
  FollowMiddlewares.verifyFollowExistenceForUnfollow,
  FollowController.unfollowUser
);
