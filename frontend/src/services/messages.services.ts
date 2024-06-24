import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getUsersWhoHaveMessage = async () => {
  return handleApiResponse<UserInterface[]>(api.get(`messages/`));
};

export const getConversationWithUser = async (userId: string) => {
  return handleApiResponse<UserInterface[]>(api.get(`messages/user/${userId}`));
};

export const postMessageToUser = async (
  userId: string,
  messageBody: { content: string }
) => {
  return handleApiResponse<UserInterface[]>(
    api.post(`messages/user/${userId}`, messageBody)
  );
};
