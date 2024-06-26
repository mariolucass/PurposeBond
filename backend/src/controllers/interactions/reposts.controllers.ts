import { Request, Response } from "express";
import { NotificationsServices } from "../../services";
import { RepostsServices } from "./../../services/interactions/reposts.services";

export class RepostsController {
  static getRepostsByUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;

    const reposts = await RepostsServices.getRepostsUser(userId);

    return res.status(201).json(reposts);
  };

  static postRepost = async (_: Request, res: Response) => {
    const {
      user: { id: userId },
      post: {
        id: postId,
        author: { id: authorId },
      },
    } = res.locals;

    const repost = await RepostsServices.postRepost(userId, postId);

    await NotificationsServices.postNotificationPostReposted({
      authorId: userId,
      userId: authorId,
      postId,
    });

    return res.status(201).json(repost);
  };

  static deleteRepost = async (_: Request, res: Response) => {
    const repostId = res.locals.repost.id;
    await RepostsServices.deleteRepost(repostId);

    return res.sendStatus(204);
  };
}
