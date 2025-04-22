import { notificationModel } from "@/database/models";
import { notificationSelect } from "@/utils/selects/utilities/notifications.selects";

enum NotificationType {
  NEW_FOLLOWER = "NEW_FOLLOWER",
  POST_LIKED = "POST_LIKED",
  POST_COMMENTED = "POST_COMMENTED",
  POST_REPOSTED = "POST_REPOSTED",
  COMMENT_LIKED = "COMMENT_LIKED",
}

enum NotificationTargetType {
  POST = "POST",
  COMMENT = "COMMENT",
  LIKE = "LIKE",
  REPOST = "REPOST",
  USER = "USER",
}

export class NotificationService {
  private static async createNotification({
    type,
    targetType,
    targetId,
    userId,
    authorId,
  }: {
    type: NotificationType;
    targetType: NotificationTargetType;
    targetId: string;
    userId: string;
    authorId: string;
  }) {
    if (userId === authorId) return;

    return await notificationModel.create({
      data: {
        type,
        targetType,
        targetId,
        userId,
        authorId,
      },
    });
  }

  static postNotificationNewFollower(data: {
    authorId: string;
    userId: string;
  }) {
    return this.createNotification({
      ...data,
      type: NotificationType.NEW_FOLLOWER,
      targetType: NotificationTargetType.USER,
      targetId: data.authorId,
    });
  }

  static postNotificationPostLiked(data: {
    authorId: string;
    userId: string;
    postId: string;
  }) {
    return this.createNotification({
      ...data,
      type: NotificationType.POST_LIKED,
      targetType: NotificationTargetType.POST,
      targetId: data.postId,
    });
  }

  static postNotificationPostReposted(data: {
    authorId: string;
    userId: string;
    postId: string;
  }) {
    return this.createNotification({
      ...data,
      type: NotificationType.POST_REPOSTED,
      targetType: NotificationTargetType.POST,
      targetId: data.postId,
    });
  }

  static postNotificationPostCommented(data: {
    authorId: string;
    userId: string;
    postId: string;
    commentId: string;
  }) {
    return this.createNotification({
      ...data,
      type: NotificationType.POST_COMMENTED,
      targetType: NotificationTargetType.COMMENT,
      targetId: data.commentId,
    });
  }

  static postNotificationCommentLiked(data: {
    authorId: string;
    userId: string;
    commentId: string;
  }) {
    return this.createNotification({
      ...data,
      type: NotificationType.COMMENT_LIKED,
      targetType: NotificationTargetType.COMMENT,
      targetId: data.commentId,
    });
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
    return await notificationModel.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  };

  static markAllNotificationAsRead = async (userId: string) => {
    return await notificationModel.updateMany({
      where: { userId },
      data: { isRead: true },
    });
  };

  static deleteNotification = async (notificationId: string) => {
    await notificationModel.delete({ where: { id: notificationId } });
  };
}
