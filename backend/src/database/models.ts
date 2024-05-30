import { prisma } from "./database";

export const userModel = prisma.user;

export const commentModel = prisma.comment;

export const postModel = prisma.post;

export const likeModel = prisma.like;

export const messageModel = prisma.message;

export const mentionModel = prisma.mention;

export const notificationModel = prisma.notification;

export const mediaModel = prisma.media;

export const repostModel = prisma.repost;
