import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getSearchPosts = async (search: string) => {
  return handleApiResponse<any>(api.get("/profile"));
};

export const getSearchUsers = async (search: string) => {
  return handleApiResponse<any>(api.get("/profile"));
};

export const getSearchMedia = async (search: string) => {
  return handleApiResponse<any>(api.get("/profile"));
};

export const getSearchPopular = async (search: string) => {
  return handleApiResponse<any>(api.get("/search"));
};
