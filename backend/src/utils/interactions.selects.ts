import { userRefSelect } from "./users.selects";

export const commentRefSelect = {
  id: true,
  content: true,
  createdAt: true,
};

export const commentSelect = {
  ...commentRefSelect,
  author: { select: userRefSelect },
};

export const likeRefSelect = {
  id: true,
  postId: true,
  authorId: true,
};

export const repostRefSelect = {
  id: true,
  postId: true,
  authorId: true,
};
