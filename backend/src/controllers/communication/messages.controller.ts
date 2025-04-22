import { MessageService } from "@/services";
import { getRoomId } from "@/socket/utils/socket.utils";
import { Request, Response } from "express";

export class MessageController {
  static postMessage = async (req: Request, res: Response) => {
    const {
      user: { id: senderId },
      reqParamsUser: { id: receiverId },
      io,
    } = res.locals;

    const { content } = req.body;

    const message = await MessageService.postMessage(
      senderId,
      receiverId,
      content
    );

    const roomId = getRoomId(message);
    console.log("📤 Emitindo para sala:", roomId);
    io.to(roomId).emit("chat:message:new", message);

    return res.status(201).json(message);
  };

  static getConversationWithUser = async (_: Request, res: Response) => {
    const {
      user: { id: userAuthId },
      reqParamsUser: { id: userId },
    } = res.locals;

    const messages = await MessageService.getConversationWithUser(
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
    const users = await MessageService.getUsersWhoHasMessagesWithLastMessage(
      userAuthenticatedId
    );

    return res.json(users);
  };
}
