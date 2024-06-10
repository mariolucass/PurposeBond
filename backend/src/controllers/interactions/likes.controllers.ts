import { Request, Response } from "express";
import { LikesServices } from "../../services/interactions/likes.services";

export class LikesController {
  static getLikesByUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    const like = await LikesServices.getLikesUser(userId);

    return res.status(201).json(like);
  };

  static postLike = async (_: Request, res: Response) => {
    const { user, post } = res.locals;
    const like = await LikesServices.postLike(post.id, user.id);

    return res.status(201).json(like);
  };

  static deleteLike = async (_: Request, res: Response) => {
    const likeId = res.locals.like.id;
    await LikesServices.deleteLike(likeId);

    return res.status(204).send();
  };
}
