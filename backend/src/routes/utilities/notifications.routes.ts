import { Router } from "express";
import { NotificationsController } from "../../controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { NotificationsMiddlewares } from "../../middlewares/utilities/notifications.middlewares";

export const notificationsRouter = Router();

notificationsRouter.use(AuthMiddlewares.validateToken);

notificationsRouter.get("/", NotificationsController.getNotifications);
notificationsRouter.patch(
  "/",
  NotificationsController.markAllNotificationsAsRead
);

notificationsRouter.use("/:id", [
  NotificationsMiddlewares.verifyNotificationExistence,
  NotificationsMiddlewares.confirmNotificationOwnership,
]);

notificationsRouter.patch("/:id", NotificationsController.patchNotification);
notificationsRouter.delete("/:id", NotificationsController.deleteNotification);
