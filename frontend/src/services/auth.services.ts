import { LoginType, RegisterType } from "@/interfaces/auth.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const postLogin = async (body: LoginType) => {
  return handleApiResponse<any>(api.post(`/login`, body));
};

export const postRegister = async (body: RegisterType) => {
  return handleApiResponse<any>(api.post(`/register`, body));
};
