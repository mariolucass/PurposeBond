import { followModel } from "@/database/models";
import { userRefSchema } from "@/schemas";
import { userRefSelect } from "@/utils/selects/content/users.selects";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FollowService {
  static async getFollowersByUser(userId: string) {
    const follows = await followModel.findMany({
      where: { followingId: userId },
      select: {
        follower: { select: userRefSelect },
      },
    });

    const followers = follows.map((f: any) => f.follower);
    return userRefSchema.array().parse(followers);
  }

  static async getFollowingByUser(userId: string) {
    const follows = await followModel.findMany({
      where: { followerId: userId },
      select: {
        following: { select: userRefSelect },
      },
    });

    const following = follows.map((f: any) => f.following);
    return userRefSchema.array().parse(following);
  }

  static async getRecommendedUsers(userAuthenticatedId: string) {
    const follows = await followModel.findMany({
      where: {
        OR: [
          { followerId: userAuthenticatedId },
          { followingId: userAuthenticatedId },
        ],
      },
      select: {
        followerId: true,
        followingId: true,
      },
    });

    const connectedIds = new Set<string>([userAuthenticatedId]);
    for (const follow of follows) {
      connectedIds.add(follow.followerId);
      connectedIds.add(follow.followingId);
    }

    const recommendedUsers = await prisma.user.findMany({
      where: { id: { notIn: Array.from(connectedIds) } },
      select: userRefSelect,
      take: 4,
    });

    return userRefSchema.array().parse(recommendedUsers);
  }

  static async followUser(userAuthenticatedId: string, userToFollowId: string) {
    if (userAuthenticatedId === userToFollowId) return;

    await followModel.create({
      data: {
        followerId: userAuthenticatedId,
        followingId: userToFollowId,
      },
    });
  }

  static async unfollowUser(
    userAuthenticatedId: string,
    userToUnfollowId: string
  ) {
    await followModel.delete({
      where: {
        followerId_followingId: {
          followerId: userAuthenticatedId,
          followingId: userToUnfollowId,
        },
      },
    });
  }
}
