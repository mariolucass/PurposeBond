import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

interface Message {
  content: string;
  createdAt: string;
  areSender: boolean;
}

interface Conversation {
  messages: Message[];
  lastMessageId: string;
}

export const MessageService = {
  getAllContacts: async (): Promise<UserInterface[]> => {
    return handleApiResponse(api.get("messages/"));
  },

  getConversation: async (userId: string): Promise<Conversation> => {
    return handleApiResponse(api.get(`messages/user/${userId}`));
  },

  sendMessage: async (
    userId: string,
    messageBody: { content: string }
  ): Promise<UserInterface[]> => {
    return handleApiResponse(api.post(`messages/user/${userId}`, messageBody));
  },
};
