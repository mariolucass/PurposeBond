import { NotificationService } from "@/services";
import { Request, Response } from "express";

export class NotificationController {
  static getNotifications = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const notifications = await NotificationService.getNotificationsForUser(
      userId
    );

    return res.json(notifications);
  };

  static markAllNotificationsAsRead = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    await NotificationService.markAllNotificationAsRead(userId);

    return res.sendStatus(204);
  };

  static patchNotification = async (_: Request, res: Response) => {
    const notificationId = res.locals.notification.id;
    await NotificationService.markNotificationAsRead(notificationId);

    return res.sendStatus(204);
  };

  static deleteNotification = async (_: Request, res: Response) => {
    const notificationId = res.locals.notification.id;
    await NotificationService.deleteNotification(notificationId);

    return res.sendStatus(204);
  };
}
