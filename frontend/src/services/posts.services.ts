import {
  PostInterface,
  PostUpdateInterface,
} from "@/interfaces/posts.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getPostsByUser = async (userId: string) => {
  return handleApiResponse<PostInterface[]>(api.get(`users/${userId}/posts`));
};

export const getPosts = async () => {
  return handleApiResponse<PostInterface[]>(api.get("/posts"));
};

export const getPost = async (postId: string) => {
  return handleApiResponse<PostInterface>(api.get(`/posts/${postId}`));
};

export const patchPost = async (body: PostUpdateInterface, postId: string) => {
  return handleApiResponse<PostInterface>(api.patch(`/posts/${postId}`, body));
};

export const deletePost = async (postId: string) => {
  return handleApiResponse<void>(api.delete(`/posts/${postId}`));
};
