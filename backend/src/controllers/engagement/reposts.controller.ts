import { NotificationService, RepostService } from "@/services";
import { Request, Response } from "express";

export class RepostController {
  static getRepostsByUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;

    const reposts = await RepostService.getRepostsUser(userId);

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

    const repost = await RepostService.postRepost(userId, postId);

    await NotificationService.postNotificationPostReposted({
      authorId: userId,
      userId: authorId,
      postId,
    });

    return res.status(201).json(repost);
  };

  static deleteRepost = async (_: Request, res: Response) => {
    const repostId = res.locals.repost.id;
    await RepostService.deleteRepost(repostId);

    return res.sendStatus(204);
  };
}
