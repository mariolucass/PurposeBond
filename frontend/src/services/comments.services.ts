import { CommentCreateInterface } from "@/interfaces/comments.interfaces";
import {
  PostInterface,
  PostUpdateInterface,
} from "@/interfaces/posts.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getCommentsByPost = async (postId: string) => {
  return handleApiResponse<PostInterface[]>(
    api.get(`posts/${postId}/comments`)
  );
};

export const postComment = async (
  postId: string,
  body: CommentCreateInterface
) => {
  return handleApiResponse<PostInterface[]>(
    api.post(`/posts/${postId}/comments`, body)
  );
};

export const getComment = async (postId: string, commentId: string) => {
  return handleApiResponse<PostInterface>(api.get(`/comments/${commentId}`));
};

export const patchComment = async (
  commentId: string,
  body: PostUpdateInterface
) => {
  return handleApiResponse<PostInterface>(
    api.patch(`/comments/${commentId}`, body)
  );
};

export const deletePost = async (commentId: string) => {
  return handleApiResponse<void>(api.delete(`/comments/${commentId}`));
};
