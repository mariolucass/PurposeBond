const _countPostSelect = {
  likes: true,
  comments: true,
  reposts: true,
  views: true,
};

const _countUserSelect = {
  followedBy: true,
  following: true,
};

export const userRefSelect = {
  id: true,
  name: true,
  username: true,
};

export const userSelect = {
  ...userRefSelect,
  phone: true,
  birthdate: true,
  description: true,
  address: true,
  _count: { select: _countUserSelect },
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
};

export const commentRefSelect = {
  id: true,
  content: true,
  createdAt: true,
};

export const commentSelect = {
  ...commentRefSelect,
  author: { select: userRefSelect },
};

export const messageSelect = {
  id: true,
  content: true,
  createdAt: true,
  sender: { select: userRefSelect },
  receiver: { select: userRefSelect },
};
