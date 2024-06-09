import { PostInterface } from "@/interfaces/posts.interfaces";
import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getProfile = async () => {
  return handleApiResponse<UserInterface>(api.get(`/profile`));
};

export const getProfileDiscussions = async () => {
  return await handleApiResponse<PostInterface[]>(
    api.get(`/profile/discussions/`)
  );
};

export const getProfileReposts = async () => {
  return handleApiResponse<PostInterface[]>(api.get(`/profile/reposts/`));
};

export const getProfileComments = async () => {
  return handleApiResponse<PostInterface[]>(api.get(`/profile/comments/`));
};

export const getProfileMedia = async () => {
  return handleApiResponse<PostInterface[]>(api.get(`/profile/media/`));
};

export const getProfilePosts = async () => {
  return handleApiResponse<PostInterface[]>(api.get(`/profile/posts/`));
};

export const getProfileLikes = async () => {
  return handleApiResponse<PostInterface[]>(api.get(`/profile/likes/`));
};
