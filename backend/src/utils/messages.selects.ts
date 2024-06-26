export const conversationSelect = {
  id: true,
  content: true,
  createdAt: true,
  sender: { select: { id: true } },
};
