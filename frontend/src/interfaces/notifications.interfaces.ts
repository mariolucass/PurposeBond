export interface NotificationAuthor {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  joinedAt: string;
  description: string | null;
}

export interface NotificationUser {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  joinedAt: string;
  description: string | null;
}

export type NotificationType =
  | "NEW_FOLLOWER"
  | "POST_LIKED"
  | "POST_REPOSTED"
  | "POST_COMMENTED";

export interface NotificationInterface {
  id: string;
  type: NotificationType;
  createdAt: string;
  targetId: string;
  user: NotificationUser;
  author: NotificationAuthor;
}
