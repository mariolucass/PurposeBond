import { PostInterface } from "@/interfaces/posts.interfaces";
import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const ProfileService = {
  getProfile: async (): Promise<UserInterface> => {
    return handleApiResponse(api.get("/profile"));
  },

  getPosts: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/posts"));
  },

  getComments: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/comments"));
  },

  getMedia: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/media"));
  },

  getReposts: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/reposts"));
  },

  getLikes: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/likes"));
  },

  getDiscussions: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/discussions"));
  },

  getFollowers: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/followers"));
  },

  getFollowing: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/profile/following"));
  },

  getCountByProperty: async (property: string): Promise<UserInterface[]> => {
    return handleApiResponse(
      api.get("/profile/count", {
        params: { property },
      })
    );
  },
};
