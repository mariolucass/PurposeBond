import { userRefSelect } from "../content/users.selects";

export const notificationSelect = {
  id: true,
  type: true,
  createdAt: true,

  targetType: true,
  targetId: true,
  isRead: true,

  author: { select: userRefSelect },
};
