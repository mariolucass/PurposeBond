import { FollowController } from "@/controllers";
import {
  AuthMiddleware,
  FollowMiddleware,
  UsersMiddleware,
} from "@/middlewares";
import { Router } from "express";

export const followRouter = Router();

followRouter.use(AuthMiddleware.validateToken);

followRouter.get("/recommended", FollowController.getRecommendedUsers);

followRouter.use("/follow/:id", [
  UsersMiddleware.verifyUserExistence,
  FollowMiddleware.preventSelfFollow,
]);

followRouter.post(
  "/follow/:id",
  FollowMiddleware.verifyFollowNonExistenceForFollow,
  FollowController.followUser
);

followRouter.delete(
  "/follow/:id",
  FollowMiddleware.verifyFollowExistenceForUnfollow,
  FollowController.unfollowUser
);
