import {
  commentModel,
  likeModel,
  messageModel,
  postModel,
  repostModel,
  userModel,
} from "@/database/models";
import { AppError } from "@/errors/appError";
import { postRefSelect } from "@/utils/selects/content/posts.selects";
import { userSelect } from "@/utils/selects/content/users.selects";
import { commentRefSelect } from "@/utils/selects/engagement/interactions.selects";
import { FollowService } from "../";

export class ProfileService {
  static getProfile = async (id: string) => {
    const user = await userModel.findUnique({
      where: { id: id },
      select: { ...userSelect, email: true },
    });

    return user;
  };

  static getCountStats = async (id: string, property: string) => {
    const listProperties = [
      "following",
      "followers",
      "posts",
      "likes",
      "comments",
      "reposts",
    ];

    if (!listProperties.includes(property)) {
      throw new AppError(400, "Invalid property: " + property);
    }

    const user = await userModel.findUnique({
      where: { id: id },
      select: {
        _count: {
          select: {
            [property]: true,
          },
        },
      },
    });

    return { [property]: user!._count[property] };
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

  static getRepostedPosts = async (id: string) => {
    const reposts = await repostModel.findMany({
      where: { authorId: id },
      select: { post: { select: postRefSelect } },
    });

    const repostedPosts = reposts.map((like: any) => like.post);
    return repostedPosts;
  };

  static getLikedPosts = async (id: string) => {
    const likes = await likeModel.findMany({
      where: { authorId: id },
      select: { post: { select: postRefSelect } },
    });

    const likedPosts = likes.map((like: any) => like.post);
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

    const postsReposted = reposts.map((repost: any) => repost.post);

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

  static getFollowers = async (id: string) => {
    const followers = await FollowService.getFollowersByUser(id);

    return followers;
  };

  static getFollowing = async (id: string) => {
    const following = await FollowService.getFollowingByUser(id);

    return following;
  };
}
