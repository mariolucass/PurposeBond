import { userModel } from "@/database/models";
import { AppError } from "@/errors/appError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export class AuthMiddleware {
  static validateToken = (req: Request, res: Response, next: NextFunction) => {
    let authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError(401, "Not authorized.");
    }

    authorization = authorization.split(" ")[1];

    const decoded = verify(authorization, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      username: string;
    };

    res.locals.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    return next();
  };

  static preventDuplicateEmail = async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;

    const userWithThisEmailExists = await userModel.findFirst({
      where: { email: email },
    });

    if (userWithThisEmailExists) {
      throw new AppError(409, "User with this email already exists.");
    }

    return next();
  };

  static preventDuplicateUsername = async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    const { username } = req.body;

    const userWithThisUsernameExists = await userModel.findFirst({
      where: { username: username },
    });

    if (userWithThisUsernameExists) {
      throw new AppError(409, "User with this username already exists.");
    }

    return next();
  };
}
