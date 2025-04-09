import { RegisterType } from "@/interfaces/auth.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const AuthService = {
  login: async (credentials: any): Promise<any> => {
    return handleApiResponse(api.post("/auth/login", credentials));
  },

  register: async (data: RegisterType): Promise<any> => {
    return handleApiResponse(api.post("/auth/register", data));
  },
};
