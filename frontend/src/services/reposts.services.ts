import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const RepostService = {
  getByUser: async (userId: string): Promise<any> => {
    return handleApiResponse(api.get(`/users/${userId}/reposts`));
  },

  create: async (postId: string): Promise<any> => {
    return handleApiResponse(api.post(`/reposts/${postId}`));
  },

  delete: async (postId: string): Promise<void> => {
    return handleApiResponse(api.delete(`/reposts/${postId}`));
  },
};
