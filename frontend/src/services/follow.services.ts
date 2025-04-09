import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const FollowService = {
  getRecommendations: async (): Promise<UserInterface[]> => {
    return handleApiResponse(api.get(`/user/recommended`));
  },

  follow: async (userId: string): Promise<void> => {
    return handleApiResponse(api.post(`/user/follow/${userId}/`));
  },

  unfollow: async (userId: string): Promise<void> => {
    return handleApiResponse(api.delete(`/user/follow/${userId}/`));
  },

  getFollowers: async (userId: string): Promise<UserInterface[]> => {
    return handleApiResponse(api.get(`/users/${userId}/followers/`));
  },

  getFollowing: async (userId: string): Promise<UserInterface[]> => {
    return handleApiResponse(api.get(`/users/${userId}/following/`));
  },
};
