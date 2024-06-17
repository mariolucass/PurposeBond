import { Request, Response } from "express";
import { FollowServices } from "../../services/social/follow.services";

export class FollowController {
  static getFollowersByUser = async (_: Request, res: Response) => {
    const userParamsId = res.locals.reqParamsUser.id;
    const data = await FollowServices.getFollowersByUser(userParamsId);

    return res.json(data);
  };

  static getFollowingByUser = async (_: Request, res: Response) => {
    const userParamsId = res.locals.reqParamsUser.id;
    const data = await FollowServices.getFollowingByUser(userParamsId);

    return res.json(data);
  };

  static getRecommendedUsers = async (_: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const data = await FollowServices.getRecommendedUsers(userAuthId);

    return res.json(data);
  };

  static followUser = async (_: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userToFollowId },
    } = res.locals;

    await FollowServices.followUser(userAuthId, userToFollowId);

    return res.status(201).json({ message: "Followed successfully." });
  };

  static unfollowUser = async (_: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userToFollowId },
    } = res.locals;

    await FollowServices.unfollowUser(userAuthId, userToFollowId);

    return res.status(204).send();
  };
}
