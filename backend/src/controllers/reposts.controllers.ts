import { Request, Response } from "express";
import { LikesServices } from "../services/likes.services";

export class RepostsController {
  static getRepostsByUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    const repost = await LikesServices.getLikesUser(userId);

    return res.json(repost);
  };

  static postRepost = async (_: Request, res: Response) => {
    const { user, post } = res.locals;
    const repost = await LikesServices.postLike(post.id, user.id);

    return res.status(201).json(repost);
  };

  static deleteRepost = async (_: Request, res: Response) => {
    const repostId = res.locals.repost.id;
    await LikesServices.deleteLike(repostId);

    return res.status(204).send();
  };
}
