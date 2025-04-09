import {
  PostCreateType,
  PostInterface,
  PostUpdateType,
} from "@/interfaces/posts.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const PostService = {
  getAll: async (): Promise<PostInterface[]> => {
    return handleApiResponse(api.get("/posts"));
  },

  getById: async (postId: string): Promise<PostInterface> => {
    return handleApiResponse(api.get(`/posts/${postId}`));
  },

  getByUser: async (userId: string): Promise<PostInterface[]> => {
    return handleApiResponse(api.get(`/users/${userId}/posts`));
  },

  getMediaByUser: async (userId: string) => {
    return handleApiResponse(api.get(`/users/${userId}/media`));
  },

  create: async (body: PostCreateType): Promise<PostInterface> => {
    return handleApiResponse(api.post("/posts", body));
  },

  update: async (
    postId: string,
    body: PostUpdateType
  ): Promise<PostInterface> => {
    return handleApiResponse(api.patch(`/posts/${postId}`, body));
  },

  delete: async (postId: string): Promise<void> => {
    return handleApiResponse(api.delete(`/posts/${postId}`));
  },
};
