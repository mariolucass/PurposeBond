import { NextFunction, Request, Response } from "express";
import { userModel } from "../database/models";
import { AppError } from "../errors/appError";
import { userRefSelect } from "../utils/prismaHelpers";

export class UsersMiddlewares {
  static verifyUserExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const user = await userModel.findUnique({
      where: { id },
      select: userRefSelect,
    });

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    res.locals.reqParamsUser = user;

    return next();
  };

  static confirmUserIdentity = (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userAuthenticatedId = res.locals.user.id;
    const userParamsId = res.locals.userFound;

    if (userAuthenticatedId !== userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
