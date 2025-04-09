import { RegisterType } from "@/interfaces/auth.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const postLogin = async (body: any) => {
  return handleApiResponse<any>(api.post(`/auth/login`, body));
};

export const postRegister = async (body: RegisterType) => {
  return handleApiResponse<any>(api.post(`/auth/register`, body));
};
