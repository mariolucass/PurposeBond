import {
  UserReturnInterface,
  UserUpdateInterface,
} from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getProfile = async () => {
  return handleApiResponse<UserReturnInterface>(api.get(`/profile`));
};

export const getUsers = async () => {
  return handleApiResponse<UserReturnInterface[]>(api.get("/users"));
};

export const getUser = async (userId: string) => {
  return handleApiResponse<UserReturnInterface>(api.get(`/users/${userId}`));
};

export const patchUser = async (body: UserUpdateInterface, userId: string) => {
  return handleApiResponse<UserReturnInterface>(
    api.patch(`/users/${userId}`, body)
  );
};

export const deleteUser = async (userId: string) => {
  return handleApiResponse<void>(api.delete(`/users/${userId}`));
};
