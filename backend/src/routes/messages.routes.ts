import { Router } from "express";
import { MessagesController } from "../controllers/messages.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";

export const messagesRouter = Router();

messagesRouter.use(AuthMiddlewares.validateToken);

messagesRouter.post("/", MessagesController.postMessage);

messagesRouter.get("/", MessagesController.getMessages);

messagesRouter.delete("/:id", MessagesController.deleteMessage);
