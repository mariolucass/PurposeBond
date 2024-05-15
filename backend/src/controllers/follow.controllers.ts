import { Request, Response } from "express";
import { FollowServices } from "../services/follow.services";

export class FollowController {
  static getFollowedUsers = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;

    const data = await FollowServices.getFollowedUsers(userAuthId);

    return res.json(data);
  };

  static getFollowingUsers = async (req: Request, res: Response) => {
    console.log(res.locals);
    const userAuthId = res.locals.user.id;

    const data = await FollowServices.getFollowingUsers(userAuthId);

    return res.json(data);
  };

  static followUser = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const userToFollowId = res.locals.reqParamsUser.id;

    await FollowServices.followUser(userAuthId, userToFollowId);

    return res.status(201).json({ message: "Followed successfully." });
  };

  static unfollowUser = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const userToFollowId = res.locals.reqParamsUser.id;

    await FollowServices.unfollowUser(userAuthId, userToFollowId);

    return res.status(204).send();
  };
}
