import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getFollowRecommendations = async () => {
  return handleApiResponse<any>(api.get(`/user/recommended`));
};

export const followUser = async (userId: string) => {
  return handleApiResponse<void>(api.post(`/user/follow/${userId}/`));
};

export const unfollowUser = async (userId: string) => {
  return handleApiResponse<void>(api.delete(`/user/follow/${userId}/`));
};
