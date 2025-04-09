import { UserInterface, UserUpdateType } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const UserService = {
  getAll: async (): Promise<UserInterface[]> => {
    return handleApiResponse(api.get("/users"));
  },

  getById: async (userId: string): Promise<UserInterface> => {
    return handleApiResponse(api.get(`/users/${userId}`));
  },

  update: async (
    userId: string,
    data: UserUpdateType
  ): Promise<UserInterface> => {
    return handleApiResponse(api.patch(`/users/${userId}`, data));
  },

  delete: async (userId: string): Promise<void> => {
    return handleApiResponse(api.delete(`/users/${userId}`));
  },
};
