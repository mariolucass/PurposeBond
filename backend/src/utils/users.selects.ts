const _countUserSelect = {
  followers: true,
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
