import { LikeService, NotificationService } from "@/services";
import { Request, Response } from "express";

export class LikeController {
  static getLikesByUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    const like = await LikeService.getLikesUser(userId);

    return res.status(201).json(like);
  };

  static postLike = async (_: Request, res: Response) => {
    const {
      user: { id: userId },
      post: {
        id: postId,
        author: { id: authorId },
      },
    } = res.locals;
    const like = await LikeService.postLike(userId, postId);

    await NotificationService.postNotificationPostLiked({
      authorId: userId,
      userId: authorId,
      postId,
    });

    return res.status(201).json(like);
  };

  static deleteLike = async (_: Request, res: Response) => {
    const likeId = res.locals.like.id;
    await LikeService.deleteLike(likeId);

    return res.sendStatus(204);
  };
}
