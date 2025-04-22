const _countUserSelect = {
  followers: true,
  following: true,
};

export const userRefSelect = {
  id: true,
  name: true,
  username: true,
  profileImage: true,
  joinedAt: true,
  description: true,
};

export const userSelect = {
  ...userRefSelect,
  phone: true,
  birthDate: true,
  description: true,
  address: true,
  joinedAt: true,
  profileImage: true,
  _count: { select: _countUserSelect },
};
