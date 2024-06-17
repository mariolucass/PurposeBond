import { Request, Response } from "express";
import { RepostsServices } from "./../../services/interactions/reposts.services";

export class RepostsController {
  static getRepostsByUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;

    const reposts = await RepostsServices.getRepostsUser(userId);

    return res.status(201).json(reposts);
  };

  static postRepost = async (_: Request, res: Response) => {
    const { user, post } = res.locals;
    console.log(post);
    const repost = await RepostsServices.postRepost(user.id, post.id);

    return res.status(201).json(repost);
  };

  static deleteRepost = async (_: Request, res: Response) => {
    const repostId = res.locals.repost.id;
    await RepostsServices.deleteRepost(repostId);

    return res.status(204).send();
  };
}
