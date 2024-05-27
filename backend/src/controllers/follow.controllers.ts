import { Request, Response } from "express";
import { FollowServices } from "../services/follow.services";

export class FollowController {
  static getRecommendedUsers = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const data = await FollowServices.getRecommendedUsers(userAuthId);

    return res.json(data);
  };

  static getFollowedUsers = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const data = await FollowServices.getFollowedUsers(userAuthId);

    return res.json(data);
  };

  static getFollowingUsers = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const data = await FollowServices.getFollowingUsers(userAuthId);

    return res.json(data);
  };

  static followUser = async (req: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userToFollowId },
    } = res.locals;

    await FollowServices.followUser(userAuthId, userToFollowId);

    return res.status(201).json({ message: "Followed successfully." });
  };

  static unfollowUser = async (req: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userToFollowId },
    } = res.locals;

    await FollowServices.unfollowUser(userAuthId, userToFollowId);

    return res.status(204).send();
  };
}
