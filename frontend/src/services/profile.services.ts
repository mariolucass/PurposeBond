import { PostInterface } from "@/interfaces/posts.interfaces";
import { UserInterface } from "@/interfaces/users.interfaces";
import { api } from "./config/api";
import { handleApiResponse } from "./config/handleResponse";

export const getProfile = async () => {
  return handleApiResponse<UserInterface>(api.get(`/profile`));
};

export const getProfilePostsAndReposts = async () => {
  const posts = await handleApiResponse<PostInterface[]>(
    api.get(`/profile/posts/`)
  );

  const reposts = await handleApiResponse<PostInterface[]>(
    api.get(`/profile/reposts/`)
  );

  return [...posts, ...reposts];
};

export const getProfileReposts = async () => {
  return handleApiResponse<PostInterface[]>(api.get(`/profile/reposts/`));
};

export const getProfileMedia = async () => {
  return handleApiResponse<UserInterface>(api.get(`/profile/media/`));
};

export const getProfilePosts = async () => {
  return handleApiResponse<UserInterface>(api.get(`/profile/posts/`));
};

export const getProfileLikes = async () => {
  return handleApiResponse<UserInterface>(api.get(`/profile/likes/`));
};
