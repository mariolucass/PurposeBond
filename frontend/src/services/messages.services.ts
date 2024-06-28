import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getUsersWhoHaveMessage = async () => {
  return handleApiResponse<UserInterface[]>(api.get(`messages/`));
};

interface Message {
  content: string;
  createdAt: string;
  areSender: boolean;
}

interface Conversation {
  messages: Message[];
  lastMessageId: "9d8ef972-e3ca-424f-870e-a2c936da4d93";
}

export const getConversationWithUser = async (userId: string) => {
  return handleApiResponse<Conversation>(api.get(`messages/user/${userId}`));
};

export const postMessageToUser = async (
  userId: string,
  messageBody: { content: string }
) => {
  return handleApiResponse<UserInterface[]>(
    api.post(`messages/user/${userId}`, messageBody)
  );
};
