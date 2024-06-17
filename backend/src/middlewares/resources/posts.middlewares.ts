import { NextFunction, Request, Response } from "express";
import { postModel } from "../../database/models";
import { AppError } from "../../errors/appError";
import { postSelect } from "../../utils/posts.selects";

export class PostsMiddlewares {
  static verifyPostExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const post = await postModel.findUnique({
      where: { id },
      select: postSelect,
    });

    if (!post) {
      throw new AppError(404, "Post not found.");
    }

    res.locals.post = post;

    return next();
  };

  static confirmPostOwnership = (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      user: { id: userAuthenticatedId },
      post: {
        author: { id: userParamsId },
      },
    } = res.locals;

    if (userAuthenticatedId !== userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
