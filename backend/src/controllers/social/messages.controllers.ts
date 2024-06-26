import { Request, Response } from "express";
import { MessagesServices } from "../../services/social/messages.services";

export class MessagesController {
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

  static getConversationWithUser = async (_: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userId },
    } = res.locals;

    const messages = await MessagesServices.getConversationWithUser(
      userAuthId,
      userId
    );

    return res.json(messages);
  };

  static getUsersWhoHasMessagesWithLastMessage = async (
    _: Request,
    res: Response
  ) => {
    const userAuthenticatedId = res.locals.user.id;
    const users = await MessagesServices.getUsersWhoHasMessagesWithLastMessage(
      userAuthenticatedId
    );

    return res.json(users);
  };
}
