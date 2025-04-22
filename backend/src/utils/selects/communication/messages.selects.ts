import { userRefSelect } from "../content/users.selects";

export const conversationSelect = {
  id: true,
  content: true,
  createdAt: true,
  sender: { select: { id: true } },
};

export const messageSelect = {
  id: true,
  content: true,
  createdAt: true,
  sender: { select: userRefSelect },
  receiver: { select: userRefSelect },
};
