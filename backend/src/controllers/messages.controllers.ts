import { Request, Response } from "express";
import { MessagesServices } from "../services/messages.services";

export class MessagesController {
  static getMessages = async (req: Request, res: Response) => {
    const senderId = res.locals.user.id;
    const receiverId = res.locals.foundUser.id;

    const messages = await MessagesServices.getMessages(senderId, receiverId);

    return res.json(messages);
  };

  static postMessage = async (req: Request, res: Response) => {
    const senderId = res.locals.user.id;
    const receiverId = res.locals.foundUser.id;

    const message = await MessagesServices.postMessage(senderId, receiverId);

    return res.status(201).json(message);
  };

  static deleteMessage = async (req: Request, res: Response) => {
    const MessageId = res.locals.message.id;
    await MessagesServices.deleteMessage(MessageId);

    return res.status(204);
  };
}
