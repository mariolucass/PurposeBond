import { Request, Response } from "express";
import { NotificationsServices } from "../services/notifications.services";

export class NotificationsController {
  static getNotifications = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const notifications = await NotificationsServices.getNotificationsForUser(
      userId
    );

    return res.json(notifications);
  };

  static patchNotification = async (_: Request, res: Response) => {
    const notificationId = res.locals.notification.id;
    await NotificationsServices.markNotificationAsRead(notificationId);

    return res.sendStatus(204);
  };

  static markAllNotificationsAsRead = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    await NotificationsServices.markAllNotificationAsRead(userId);

    return res.sendStatus(204);
  };

  static deleteNotification = async (_: Request, res: Response) => {
    const notificationId = res.locals.notification.id;
    await NotificationsServices.deleteNotification(notificationId);

    return res.sendStatus(204);
  };
}
