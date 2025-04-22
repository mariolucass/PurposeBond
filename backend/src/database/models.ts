import { prisma } from "./database";

export const userModel = prisma.user;
export const settingsModel = prisma.settings;
export const followModel = prisma.follow;
export const userBadgeModel = prisma.userBadge;
export const userActivityLogModel = prisma.userActivityLog;

export const postModel = prisma.post;
export const commentModel = prisma.comment;
export const likeModel = prisma.like;
export const repostModel = prisma.repost;
export const postViewModel = prisma.postView;
export const mentionModel = prisma.mention;
export const mediaModel = prisma.media;

export const messageModel = prisma.message;

export const notificationModel = prisma.notification;

export const badgeModel = prisma.badge;

export const communityModel = prisma.community;
export const communityMemberModel = prisma.communityMember;
