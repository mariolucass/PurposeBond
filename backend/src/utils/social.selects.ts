import { userRefSelect } from "./users.selects";

export const messageSelect = {
  id: true,
  content: true,
  createdAt: true,
  sender: { select: userRefSelect },
  receiver: { select: userRefSelect },
};
