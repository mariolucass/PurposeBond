import { PostInterface } from "@/interfaces/posts.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getLikesByUser = async (userId: string) => {
  return handleApiResponse<PostInterface[]>(api.get(`users/${userId}/posts`));
};

export const postLike = async (postId: string) => {
  return handleApiResponse<lIKEiNTE>(api.post(`/posts/${postId}`));
};

export const deleteLike = async (postId: string) => {
  return handleApiResponse<void>(api.delete(`/posts/${postId}`));
};
