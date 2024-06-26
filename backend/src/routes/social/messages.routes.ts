import { Router } from "express";

import { MessagesController } from "../../controllers/social/messages.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { UsersMiddlewares } from "../../middlewares/resources/users.middlewares";
import { MessagesMiddleware } from "../../middlewares/social/messages.middlewares";
export const messagesRouter = Router();

messagesRouter.use(AuthMiddlewares.validateToken);

messagesRouter.get(
  "/",
  MessagesController.getUsersWhoHasMessagesWithLastMessage
);

messagesRouter.use("/user/:id", [
  UsersMiddlewares.verifyUserExistence,
  MessagesMiddleware.preventSelfMessage,
]);

messagesRouter.get("/user/:id", MessagesController.getConversationWithUser);

messagesRouter.post("/user/:id", MessagesController.postMessage);
