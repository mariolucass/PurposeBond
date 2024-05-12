import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export class FollowMiddlewares {
  static preventSelfFollow = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userAuthenticatedId = res.locals.user.id;
    const userParamsId = res.locals.reqParamsUser.id;

    if (userAuthenticatedId === userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
