import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getLikesProfile = async () => {
  return handleApiResponse<any>(api.get(`profile/reposts`));
};

export const getLikesByUser = async (userId: string) => {
  return handleApiResponse<any>(api.get(`users/${userId}/reposts`));
};

export const postRepost = async (postId: string) => {
  return handleApiResponse<any>(api.post(`/reposts/${postId}`));
};

export const deleteRepost = async (postId: string) => {
  return handleApiResponse<void>(api.delete(`/reposts/${postId}`));
};
