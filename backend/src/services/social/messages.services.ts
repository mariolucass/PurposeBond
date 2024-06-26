import { Prisma } from "@prisma/client";
import { dbCache } from "../../config/node-cache";
import { messageModel, userModel } from "../../database/models";
import { messageReturnSchema } from "../../schemas/messages.schemas";
import { conversationSelect } from "../../utils/messages.selects";
import { messageSelect } from "../../utils/social.selects";

type MessageType = {
  id: string;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
  };
};

const mapMessageToUserPerspective = (
  message: MessageType,
  userAuthenticatedId: string
): any => {
  const {
    createdAt,
    content,
    sender: { id: senderId },
  } = message;
  const areSender = senderId === userAuthenticatedId;
  return {
    content,
    createdAt,
    areSender,
  };
};

export class MessagesServices {
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
      select: messageSelect,
    });

    return messageReturnSchema.parse(message);
  };

  static deleteMessage = async (id: string) => {
    await messageModel.delete({ where: { id: id } });
  };

  static getUsersWhoHasMessagesWithLastMessage = async (
    userAuthenticatedId: string
  ) => {
    const query = {
      OR: [
        { messagesReceived: { some: { senderId: userAuthenticatedId } } },
        { messagesSent: { some: { receiverId: userAuthenticatedId } } },
      ],
    };

    const selectUser = {
      id: true,
      name: true,
      username: true,
      profileImage: true,
    };

    const messageSelect = { createdAt: true, content: true };

    const usersWithLatestMessages = await userModel.findMany({
      where: query,

      select: {
        ...selectUser,

        messagesReceived: {
          select: messageSelect,
          where: { senderId: userAuthenticatedId },
          orderBy: { createdAt: "desc" },
          take: 1,
        },

        messagesSent: {
          select: messageSelect,
          where: { receiverId: userAuthenticatedId },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    const users = usersWithLatestMessages.map((user) => {
      const latestMessage = user.messagesReceived[0] || user.messagesSent[0];

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        profileImage: user.profileImage,
        message: {
          createdAt: latestMessage.createdAt,
          content: latestMessage?.content || null,
          isSender: !user.messagesReceived.length,
        },
      };
    });

    return users;
  };

  static getConversationWithUser = async (
    userAuthenticatedId: string,
    userId: string
  ) => {
    const queryFilter: Prisma.MessageWhereInput = {
      OR: [
        { senderId: userAuthenticatedId, receiverId: userId },
        { senderId: userId, receiverId: userAuthenticatedId },
      ],
    };

    const messages = await messageModel.findMany({
      where: queryFilter,
      select: conversationSelect,
      orderBy: { createdAt: "asc" },
    });

    const cacheKey = `chat_${userAuthenticatedId}_${userId}`;
    dbCache.set(cacheKey, messages);

    return {
      messages: messages.map((message) =>
        mapMessageToUserPerspective(message, userAuthenticatedId)
      ),
      lastMessageId: messages.at(-1)!.id,
    };
  };
}
