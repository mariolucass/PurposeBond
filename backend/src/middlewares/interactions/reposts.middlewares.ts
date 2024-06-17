import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/appError";

export class RepostsMiddlewares {
  static verifyRepostNonExistenceForRepost = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { post, user } = res.locals;

    const haveRepost = post.reposts.some(
      (repost: any) => repost.authorId === user.id
    );

    if (haveRepost) {
      throw new AppError(409, "User already reposted this post");
    }

    return next();
  };

  static verifyRepostExistenceForUnrepost = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { post, user } = res.locals;

    const repost = post.reposts.find(
      (repost: any) => repost.authorId === user.id
    );

    if (!repost) {
      throw new AppError(409, "User already unreposted this post");
    }

    res.locals.repost = repost;

    return next();
  };
}
