import {
  PostCreateType,
  PostInterface,
  PostUpdateType,
} from "@/interfaces/posts.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getPostsByUser = async (userId: string) => {
  return handleApiResponse<PostInterface[]>(api.get(`users/${userId}/posts`));
};

export const getMediaByUser = async (userId: string) => {
  return handleApiResponse<any>(api.get(`users/${userId}/media`));
};

export const getPosts = async () => {
  return handleApiResponse<PostInterface[]>(api.get("/posts"));
};

export const getPost = async (postId: string) => {
  return handleApiResponse<PostInterface>(api.get(`/posts/${postId}`));
};

export const postPost = async (body: PostCreateType) => {
  return handleApiResponse<PostInterface>(api.post("/posts/", body));
};

export const patchPost = async (body: PostUpdateType, postId: string) => {
  return handleApiResponse<PostInterface>(api.patch(`/posts/${postId}`, body));
};

export const deletePost = async (postId: string) => {
  return handleApiResponse<void>(api.delete(`/posts/${postId}`));
};
