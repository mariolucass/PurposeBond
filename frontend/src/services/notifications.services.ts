import { NotificationInterface } from "@/interfaces/notifications.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const NotificationService = {
  getNotifications: async () => {
    return handleApiResponse<NotificationInterface[]>(
      api.get("notifications/")
    );
  },

  patchMarkAllNotificationsRead: async () => {
    return handleApiResponse<void>(api.patch("/notifications/"));
  },

  patchMarkNotificationRead: async (notificationId: string) => {
    return handleApiResponse<void>(
      api.patch(`/notifications/${notificationId}`)
    );
  },

  deleteNotification: async (notificationId: string) => {
    return handleApiResponse<void>(
      api.delete(`/notifications/${notificationId}`)
    );
  },
};
