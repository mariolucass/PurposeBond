import { likeRefSelect } from "../engagement/interactions.selects";
import { userRefSelect } from "./users.selects";

const _countPostSelect = {
  likes: true,
  comments: true,
  reposts: true,
  views: true,
};

export const postRefSelect = {
  id: true,
  content: true,
  createdAt: true,

  _count: { select: _countPostSelect },
};

export const postSelect = {
  ...postRefSelect,

  author: { select: userRefSelect },
  likes: { select: likeRefSelect },
  reposts: { select: likeRefSelect },
};
