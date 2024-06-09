import { Router } from "express";
import { MessagesController } from "../controllers/messages.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { UsersMiddlewares } from "../middlewares/users.middlewares";

export const messagesRouter = Router();

messagesRouter.use(AuthMiddlewares.validateToken);

messagesRouter.get("/", MessagesController.getMessages);

messagesRouter.post(
  "/:id",
  UsersMiddlewares.verifyUserExistence,
  MessagesController.postMessage
);

messagesRouter.delete("/:id", MessagesController.deleteMessage);
