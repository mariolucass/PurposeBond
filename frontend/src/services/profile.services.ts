import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getProfile = async () => {
  return handleApiResponse<UserInterface>(api.get(`/profile`));
};
