import { userModel } from "@/database/models";
import { AppError } from "@/errors/appError";
import { userRefSelect } from "@/utils/selects/content/users.selects";
import { NextFunction, Request, Response } from "express";

export class UsersMiddleware {
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
    const {
      user: { id: userAuthenticatedId },
      reqParamsUser: { id: userParamsId },
    } = res.locals;

    if (userAuthenticatedId !== userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
