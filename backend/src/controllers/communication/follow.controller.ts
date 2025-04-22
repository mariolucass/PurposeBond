import { FollowService, NotificationService } from "@/services";
import { Request, Response } from "express";

export class FollowController {
  static getFollowersByUser = async (_: Request, res: Response) => {
    const userParamsId = res.locals.reqParamsUser.id;
    const data = await FollowService.getFollowersByUser(userParamsId);

    return res.json(data);
  };

  static getFollowingByUser = async (_: Request, res: Response) => {
    const userParamsId = res.locals.reqParamsUser.id;
    const data = await FollowService.getFollowingByUser(userParamsId);

    return res.json(data);
  };

  static getRecommendedUsers = async (_: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const data = await FollowService.getRecommendedUsers(userAuthId);

    return res.json(data);
  };

  static followUser = async (_: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userToFollowId },
    } = res.locals;

    await FollowService.followUser(userAuthId, userToFollowId);

    await NotificationService.postNotificationNewFollower({
      authorId: userAuthId,
      userId: userToFollowId,
    });

    return res.status(201).json({ message: "Followed successfully." });
  };

  static unfollowUser = async (_: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userToFollowId },
    } = res.locals;

    await FollowService.unfollowUser(userAuthId, userToFollowId);

    return res.sendStatus(204);
  };
}
