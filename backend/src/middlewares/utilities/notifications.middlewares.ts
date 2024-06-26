import { NextFunction, Request, Response } from "express";
import { notificationModel } from "../../database/models";
import { AppError } from "../../errors/appError";

export class NotificationsMiddlewares {
  static verifyNotificationExistence = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;

    const notification = await notificationModel.findUnique({
      where: { id },
      select: { id: true, user: { select: { id: true, username: true } } },
    });

    if (!notification) {
      throw new AppError(404, "Notification not found.");
    }

    res.locals.notification = notification;

    return next();
  };

  static confirmNotificationOwnership = (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      user: { id: userAuthenticatedId },
      notification: {
        user: { id: userParamsId },
      },
    } = res.locals;

    if (userAuthenticatedId !== userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };
}
