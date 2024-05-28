import { UserInterface, UserUpdateType } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getProfile = async () => {
  return handleApiResponse<UserInterface>(api.get(`/profile`));
};

export const getUsers = async () => {
  return handleApiResponse<UserInterface[]>(api.get("/users"));
};

export const getUser = async (userId: string) => {
  return handleApiResponse<UserInterface>(api.get(`/users/${userId}`));
};

export const patchUser = async (body: UserUpdateType, userId: string) => {
  return handleApiResponse<UserInterface>(api.patch(`/users/${userId}`, body));
};

export const deleteUser = async (userId: string) => {
  return handleApiResponse<void>(api.delete(`/users/${userId}`));
};
