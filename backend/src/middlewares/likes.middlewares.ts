import { NextFunction, Request, Response } from "express";
import { likeModel } from "../database/models";
import { AppError } from "../errors/appError";

export class LikesMiddlewares {
  static verifyLikeExistence = async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const like = await likeModel.findUnique({
      where: { id },
    });

    if (!like) {
      throw new AppError(404, "Like not found");
    }

    return next();
  };
}
