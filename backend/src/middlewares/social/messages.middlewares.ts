import { NextFunction, Request, Response } from "express";
import { messageModel } from "../../database/models";
import { AppError } from "../../errors/appError";

export class MessagesMiddleware {
  static preventSelfMessage = (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      user: { id: userAuthenticatedId },
      reqParamsUser: { id: userParamsId },
    } = res.locals;

    if (userAuthenticatedId === userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
