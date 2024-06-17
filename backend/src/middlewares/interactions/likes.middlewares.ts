import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/appError";

export class LikesMiddlewares {
  static verifyLikeNonExistenceForLike = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { post, user } = res.locals;

    const haveLike = post.likes.some((like: any) => like.authorId === user.id);

    if (haveLike) {
      throw new AppError(409, "User already liked this post");
    }

    return next();
  };

  static verifyLikeExistenceForUnlike = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { post, user } = res.locals;

    const like = post.likes.find((like: any) => like.authorId === user.id);

    if (!like) {
      throw new AppError(409, "User already unliked this post");
    }

    res.locals.like = like;

    return next();
  };
}
