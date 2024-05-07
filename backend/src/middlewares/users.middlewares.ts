import { NextFunction, Request, Response } from "express";
import { userModel } from "../database/models";
import { AppError } from "../errors/appError";

export class UsersMiddlewares {
  static verifyUserExistence = async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const user = await userModel.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    return next();
  };

  static confirmUserIdentity = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userAuthenticatedId = res.locals.user.id;
    const userParamsId = req.params.id;

    if (userAuthenticatedId !== userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
