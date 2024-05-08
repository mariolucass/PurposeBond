import { Request, Response } from "express";
import { LikesServices } from "../services/likes.services";

export class LikesController {
  static getLikes = async (req: Request, res: Response) => {
    const likes = await LikesServices.getLikes();

    return res.json(likes);
  };

  static postLike = async (req: Request, res: Response) => {
    const like = await LikesServices.postLike(
      req.params.postId,
      res.locals.user.id
    );

    return res.status(201).json(like);
  };

  static retrieveLike = async (req: Request, res: Response) => {
    const likeId = res.locals.like.id;
    const like = await LikesServices.retrieveLike(likeId);

    return res.json(like);
  };

  static patchLike = async (req: Request, res: Response) => {
    const likeId = res.locals.like.id;
    const like = await LikesServices.patchLike(likeId, req.body);

    return res.json(like);
  };

  static deleteLike = async (req: Request, res: Response) => {
    const likeId = res.locals.like.id;
    await LikesServices.deleteLike(likeId);

    return res.status(204);
  };
}
