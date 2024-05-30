import { Request, Response } from "express";
import { MessagesServices } from "../services/messages.services";

export class MessagesController {
  static getMessages = async (_: Request, res: Response) => {
    const senderId = res.locals.user.id;
    const messages = await MessagesServices.getMessages(senderId);

    return res.json(messages);
  };

  static postMessage = async (req: Request, res: Response) => {
    const {
      user: { id: senderId },
      reqParamsUser: { id: receiverId },
    } = res.locals;

    const { content } = req.body;

    const message = await MessagesServices.postMessage(
      senderId,
      receiverId,
      content
    );

    return res.status(201).json(message);
  };

  static deleteMessage = async (_: Request, res: Response) => {
    const MessageId = res.locals.message.id;
    await MessagesServices.deleteMessage(MessageId);

    return res.status(204);
  };
}
