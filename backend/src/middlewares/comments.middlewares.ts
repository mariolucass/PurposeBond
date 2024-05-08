import { NextFunction, Request, Response } from "express";
import { commentModel } from "../database/models";
import { AppError } from "../errors/appError";

export class CommentsMiddlewares {
  static verifyCommentExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const comment = await commentModel.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new AppError(404, "Comment not found");
    }

    res.locals.comment = comment;

    return next();
  };
}
