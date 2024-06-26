import { notificationModel } from "../../database/models";
import { notificationSelect } from "../../utils/notifications.selects";

enum NotificationType {
  NEW_FOLLOWER = "NEW_FOLLOWER",
  POST_LIKED = "POST_LIKED",
  POST_COMMENTED = "POST_COMMENTED",
  POST_REPOSTED = "POST_REPOSTED",
  COMMENT_LIKED = "COMMENT_LIKED",
}

export class NotificationsServices {
  private static async createNotification(type: NotificationType, data: any) {
    if (data.userId === data.authorId) {
      return;
    }
    return await notificationModel.create({
      data: { type, ...data },
    });
  }

  static postNotificationNewFollower(data: {
    authorId: string;
    userId: string;
  }) {
    return this.createNotification(NotificationType.NEW_FOLLOWER, data);
  }

  static postNotificationPostLiked(data: {
    authorId: string;
    userId: string;
    postId: string;
  }) {
    return this.createNotification(NotificationType.POST_LIKED, data);
  }

  static postNotificationPostReposted(data: {
    authorId: string;
    userId: string;
    postId: string;
  }) {
    return this.createNotification(NotificationType.POST_REPOSTED, data);
  }

  static postNotificationPostCommented(data: {
    authorId: string;
    userId: string;
    postId: string;
    commentId: string;
  }) {
    return this.createNotification(NotificationType.POST_COMMENTED, data);
  }

  static postNotificationCommentLiked(data: {
    authorId: string;
    userId: string;
    commentId: string;
  }) {
    return this.createNotification(NotificationType.COMMENT_LIKED, data);
  }

  static getNotificationsForUser = async (userId: string) => {
    const notifications = await notificationModel.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: notificationSelect,
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

  static markAllNotificationAsRead = async (userId: string) => {
    const updatedNotifications = await notificationModel.updateMany({
      where: { userId },
      data: { isRead: true },
    });

    return updatedNotifications;
  };

  static deleteNotification = async (notificationId: string) => {
    await notificationModel.delete({ where: { id: notificationId } });
  };
}
