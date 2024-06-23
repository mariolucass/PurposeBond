import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getNotifications = async () => {
  return handleApiResponse<any[]>(api.get("notifications/"));
};

export const patchMarkAllNotificationsRead = async () => {
  return handleApiResponse<void>(api.patch("/notifications/"));
};

export const patchMarkNotificationRead = async (notificationId: string) => {
  return handleApiResponse<void>(api.patch(`/notifications/${notificationId}`));
};

export const deleteNotification = async (notificationId: string) => {
  return handleApiResponse<void>(
    api.delete(`/notifications/${notificationId}`)
  );
};
