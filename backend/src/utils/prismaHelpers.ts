const _countSelect = {
  likes: true,
  comments: true,
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
};

export const postRefSelect = {
  id: true,
  content: true,
  createdAt: true,
  _count: { select: _countSelect },
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
