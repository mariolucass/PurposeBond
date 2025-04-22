import { NotificationController } from "@/controllers";
import { AuthMiddleware, NotificationsMiddleware } from "@/middlewares";
import { Router } from "express";

export const notificationsRouter = Router();

notificationsRouter.use(AuthMiddleware.validateToken);

notificationsRouter.get("/", NotificationController.getNotifications);
notificationsRouter.patch(
  "/",
  NotificationController.markAllNotificationsAsRead
);

notificationsRouter.use("/:id", [
  NotificationsMiddleware.verifyNotificationExistence,
  NotificationsMiddleware.confirmNotificationOwnership,
]);

notificationsRouter.patch("/:id", NotificationController.patchNotification);
notificationsRouter.delete("/:id", NotificationController.deleteNotification);
