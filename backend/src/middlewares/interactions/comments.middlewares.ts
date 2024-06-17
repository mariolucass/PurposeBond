import { NextFunction, Request, Response } from "express";
import { commentModel } from "../../database/models";
import { AppError } from "../../errors/appError";
import { commentSelect } from "../../utils/interactions.selects";

export class CommentsMiddlewares {
  static verifyCommentExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const comment = await commentModel.findUnique({
      where: { id },
      select: commentSelect,
    });

    if (!comment) {
      throw new AppError(404, "Comment not found");
    }

    res.locals.comment = comment;

    return next();
  };

  static confirmCommentOwnership = (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      user: { id: userAuthenticatedId },
      comment: {
        author: { id: userParamsId },
      },
    } = res.locals;

    if (userAuthenticatedId !== userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
