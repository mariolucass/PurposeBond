import { NextFunction, Request, Response } from "express";
import { postModel } from "../database/models";
import { AppError } from "../errors/appError";

export class PostsMiddlewares {
  static verifyPostExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const post = await postModel.findUnique({
      where: { id },
    });

    if (!post) {
      throw new AppError(404, "Post not found.");
    }

    res.locals.post = post;

    return next();
  };
}
