import { Router } from "express";
import { FollowController } from "../../controllers/social/follow.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { UsersMiddlewares } from "../../middlewares/resources/users.middlewares";
import { FollowMiddlewares } from "../../middlewares/social/follow.middleware";

export const followRouter = Router();

followRouter.use(AuthMiddlewares.validateToken);

followRouter.get("/recommended", FollowController.getRecommendedUsers);

followRouter.get("/followers", FollowController.getFollowedUsers);

followRouter.get("/following", FollowController.getFollowingUsers);

followRouter.use("/follow/:id", [
  UsersMiddlewares.verifyUserExistence,
  FollowMiddlewares.preventSelfFollow,
]);

followRouter.post(
  "/follow/:id",
  FollowMiddlewares.verifyFollowNonExistenceForFollow,
  FollowController.followUser
);

followRouter.delete(
  "/follow/:id",
  FollowMiddlewares.verifyFollowExistenceForUnfollow,
  FollowController.unfollowUser
);
