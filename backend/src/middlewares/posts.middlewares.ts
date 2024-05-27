import { NextFunction, Request, Response } from "express";
import { postModel } from "../database/models";
import { AppError } from "../errors/appError";
import { postSelect } from "../utils/prismaHelpers";

export class PostsMiddlewares {
  static verifyPostExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const post = await postModel.findUnique({
      where: { id },
      select: {
        ...postSelect,
        likes: { select: { id: true, postId: true, userId: true } },
      },
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
    const userAuthenticatedId = res.locals.user.id;
    const userParamsId = res.locals.post.author.id;

    if (userAuthenticatedId !== userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
