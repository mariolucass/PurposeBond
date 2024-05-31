import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getLikesProfile = async () => {
  return handleApiResponse<any>(api.get(`profile/likes`));
};

export const getLikesByUser = async (userId: string) => {
  return handleApiResponse<any>(api.get(`users/${userId}/likes`));
};

export const postLike = async (postId: string) => {
  return handleApiResponse<any>(api.post(`/likes/${postId}`));
};

export const deleteLike = async (postId: string) => {
  return handleApiResponse<void>(api.delete(`/likes/${postId}`));
};
