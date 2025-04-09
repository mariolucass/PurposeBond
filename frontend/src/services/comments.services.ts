import {
  CommentCreateType,
  CommentInterface,
  CommentUpdateType,
} from "@/interfaces/comments.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const CommentService = {
  getByPost: async (postId: string): Promise<CommentInterface[]> => {
    return handleApiResponse(api.get(`/posts/${postId}/comments`));
  },

  getById: async (commentId: string): Promise<CommentInterface> => {
    return handleApiResponse(api.get(`/comments/${commentId}`));
  },

  create: async (
    postId: string,
    body: CommentCreateType
  ): Promise<CommentInterface[]> => {
    return handleApiResponse(api.post(`/posts/${postId}/comments`, body));
  },

  update: async (
    commentId: string,
    body: CommentUpdateType
  ): Promise<CommentInterface> => {
    return handleApiResponse(api.patch(`/comments/${commentId}`, body));
  },

  delete: async (commentId: string): Promise<void> => {
    return handleApiResponse(api.delete(`/comments/${commentId}`));
  },
};
