import { userRefSelect } from "./users.selects";

export const notificationSelect = {
  id: true,
  type: true,
  createdAt: true,

  postId: true,
  commentId: true,
  likeId: true,
  repostId: true,
  followerId: true,

  user: { select: userRefSelect },
  author: { select: userRefSelect },
};
