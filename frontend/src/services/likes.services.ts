import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const LikeService = {
  getByUser: async (userId: string): Promise<any> => {
    return handleApiResponse(api.get(`/users/${userId}/likes`));
  },

  like: async (postId: string): Promise<any> => {
    return handleApiResponse(api.post(`/likes/${postId}`));
  },

  unlike: async (postId: string): Promise<void> => {
    return handleApiResponse(api.delete(`/likes/${postId}`));
  },
};
