import { Request, Response } from "express";
import { LikesServices } from "../services/likes.services";

export class LikesController {
  static getLikesByUser = async (req: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    const like = await LikesServices.getLikesUser(userId);

    return res.status(201).json(like);
  };

  static postLike = async (req: Request, res: Response) => {
    const like = await LikesServices.postLike(
      req.params.postId,
      res.locals.user.id
    );

    return res.status(201).json(like);
  };

  static deleteLike = async (req: Request, res: Response) => {
    const likeId = res.locals.like.id;
    await LikesServices.deleteLike(likeId);

    return res.status(204);
  };
}
