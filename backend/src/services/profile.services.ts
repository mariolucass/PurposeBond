import {
  commentModel,
  likeModel,
  messageModel,
  postModel,
  repostModel,
  userModel,
} from "../database/models";
import { commentRefSelect, userSelect } from "../utils/prismaHelpers";
import { postRefSelect } from "./../utils/prismaHelpers";

export class ProfileServices {
  static getProfile = async (id: string) => {
    const user = await userModel.findUnique({
      where: { id: id },
      select: userSelect,
    });

    return user;
  };

  static getPosts = async (id: string) => {
    const posts = await postModel.findMany({
      where: { authorId: id },
      select: postRefSelect,
      orderBy: { createdAt: "desc" },
    });

    return posts;
  };

  static getMedia = async (id: string) => {
    const posts = await postModel.findMany({
      where: { authorId: id, media: { some: {} } },
      select: postRefSelect,
      orderBy: { createdAt: "desc" },
    });

    return posts;
  };

  static getLikes = async (id: string) => {
    const likes = await likeModel.findMany({
      where: { authorId: id },
      select: { post: { select: postRefSelect } },
    });

    const likedPosts = likes.map((like) => like.post);

    return likedPosts;
  };

  static getDiscussions = async (id: string) => {
    const posts = await postModel.findMany({
      where: { authorId: id },
      select: postRefSelect,
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const comments = await commentModel.findMany({
      where: { authorId: id },
      select: commentRefSelect,
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const reposts = await repostModel.findMany({
      where: { authorId: id },
      select: { post: { select: postRefSelect } },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const postsReposted = reposts.map((repost) => repost.post);

    const discussionsOrderedByCreatedAt = [
      ...posts,
      ...comments,
      ...postsReposted,
    ];

    discussionsOrderedByCreatedAt.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    return discussionsOrderedByCreatedAt.slice(0, 20);
  };

  static getMessages = async (id: string) => {
    const messages = await messageModel.findMany({
      where: { OR: [{ senderId: id }, { receiverId: id }] },
      include: { sender: true, receiver: true },
      orderBy: { createdAt: "desc" },
    });

    return messages;
  };
}
