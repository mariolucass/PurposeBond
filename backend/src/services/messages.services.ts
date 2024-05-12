import { messageModel } from "../database/models";
import { messageReturnSchema } from "../schemas/messages.schemas";

export class MessagesServices {
  static getMessages = async (userAuthenticatedId: string) => {
    const messages = await messageModel.findMany({
      where: {
        OR: [
          { senderId: userAuthenticatedId },
          { receiverId: userAuthenticatedId },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: { sender: true, receiver: true },
    });

    return messageReturnSchema.array().parse(messages);
  };

  static postMessage = async (
    userAuthenticatedId: string,
    receiverId: string,
    content: string
  ) => {
    const message = await messageModel.create({
      data: { senderId: userAuthenticatedId, receiverId: receiverId, content },
      include: { receiver: true },
    });

    return messageReturnSchema.parse(message);
  };

  static deleteMessage = async (id: string) => {
    await messageModel.delete({ where: { id: id } });
  };
}
