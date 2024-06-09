import {
  CommentCreateType,
  CommentInterface,
  CommentUpdateType,
} from "@/interfaces/comments.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getCommentsByPost = async (postId: string) => {
  return handleApiResponse<CommentInterface[]>(
    api.get(`posts/${postId}/comments`)
  );
};

export const postComment = async (postId: string, body: CommentCreateType) => {
  return handleApiResponse<CommentInterface[]>(
    api.post(`/posts/${postId}/comments`, body)
  );
};

export const getComment = async (commentId: string) => {
  return handleApiResponse<CommentInterface>(api.get(`/comments/${commentId}`));
};

export const patchComment = async (
  commentId: string,
  body: CommentUpdateType
) => {
  return handleApiResponse<CommentInterface>(
    api.patch(`/comments/${commentId}`, body)
  );
};

export const deletePost = async (commentId: string) => {
  return handleApiResponse<void>(api.delete(`/comments/${commentId}`));
};
