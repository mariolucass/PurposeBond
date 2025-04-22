import { MessageController } from "@/controllers";
import {
  AuthMiddleware,
  GlobalMiddleware,
  MessagesMiddleware,
  UsersMiddleware,
} from "@/middlewares";
import { Router } from "express";

export const messagesRouter = Router();

messagesRouter.use(AuthMiddleware.validateToken);

messagesRouter.get(
  "/",
  MessageController.getUsersWhoHasMessagesWithLastMessage
);

messagesRouter.use("/user/:id", [
  UsersMiddleware.verifyUserExistence,
  MessagesMiddleware.preventSelfMessage,
]);

messagesRouter.get("/user/:id", MessageController.getConversationWithUser);

messagesRouter.post(
  "/user/:id",
  GlobalMiddleware.injectSocketIO,
  MessageController.postMessage
);
