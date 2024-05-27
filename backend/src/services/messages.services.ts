import { messageModel } from "../database/models";
import { messageReturnSchema } from "../schemas/messages.schemas";
import { userRefSelect } from "../utils/prismaHelpers";

export class MessagesServices {
  private static async fetchMessages(whereClause: any) {
    const messages = await messageModel.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: { sender: true, receiver: true },
    });

    return messageReturnSchema.array().parse(messages);
  }

  static getMessages = async (userAuthenticatedId: string) => {
    return this.fetchMessages({
      OR: [
        { senderId: userAuthenticatedId },
        { receiverId: userAuthenticatedId },
      ],
    });
  };

  static getMessagesBySender = async (userAuthenticatedId: string) => {
    return this.fetchMessages({ senderId: userAuthenticatedId });
  };

  static getMessagesByReceiver = async (userAuthenticatedId: string) => {
    return this.fetchMessages({ receiverId: userAuthenticatedId });
  };

  static postMessage = async (
    userAuthenticatedId: string,
    receiverId: string,
    content: string
  ) => {
    const message = await messageModel.create({
      data: {
        senderId: userAuthenticatedId,
        receiverId: receiverId,
        content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        sender: { select: userRefSelect },
        receiver: { select: userRefSelect },
      },
    });

    console.log(message);

    return messageReturnSchema.parse(message);
  };

  static deleteMessage = async (id: string) => {
    await messageModel.delete({ where: { id: id } });
  };
}
