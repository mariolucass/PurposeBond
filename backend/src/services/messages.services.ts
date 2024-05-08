import { messageModel } from "../database/models";
import { messageReturnSchema } from "../schemas/messages.schemas";

export class MessagesServices {
  static getMessages = async (senderId: string, receiverId: string) => {
    const messages = await messageModel.findMany();

    return messageReturnSchema.parse(messages);
  };

  static postMessage = async (senderId: string, receiverId: string) => {
    const message = await messageModel.create({
      data: { senderId: senderId, receiverId: receiverId },
    });

    return messageReturnSchema.parse(message);
  };

  static deleteMessage = async (id: string) => {
    await messageModel.delete({ where: { id: id } });
  };
}
