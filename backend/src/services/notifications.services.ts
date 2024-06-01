import { notificationModel } from "../database/models";

export class NotificationsServices {
  static postNotification = async (data: any) => {
    const notification = await notificationModel.create({ data });
    return notification;
  };

  static getNotificationsForUser = async (userId: string) => {
    const notifications = await notificationModel.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    return notifications;
  };

  static markNotificationAsRead = async (notificationId: string) => {
    const updatedNotification = await notificationModel.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
    return updatedNotification;
  };

  static deleteNotification = async (notificationId: string) => {
    await notificationModel.delete({ where: { id: notificationId } });
  };
}
