import { Router } from "express";
import { MessagesController } from "../controllers/messages.controllers";

export const messagesRouter = Router();

messagesRouter.post("/", MessagesController.postMessage);

messagesRouter.get("/", MessagesController.getMessages);

messagesRouter.delete("/:id", MessagesController.deleteMessage);
