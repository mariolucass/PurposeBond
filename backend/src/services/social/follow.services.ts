import { userModel } from "../../database/models";
import { userRefSchema } from "../../schemas/users.schemas";
import { userRefSelect } from "../../utils/users.selects";

export class FollowServices {
  private static async fetchUserWithFollowData(userId: string) {
    const user = await userModel.findUnique({
      where: { id: userId },
      select: {
        ...userRefSelect,
        followers: { select: userRefSelect },
        following: { select: userRefSelect },
      },
    });

    return user!;
  }

  static async getFollowersByUser(userId: string) {
    const { followers } = await this.fetchUserWithFollowData(userId);
    return userRefSchema.array().parse(followers);
  }

  static async getFollowingByUser(userId: string) {
    const { following } = await this.fetchUserWithFollowData(userId);
    return userRefSchema.array().parse(following);
  }

  static async getRecommendedUsers(userAuthenticatedId: string) {
    const user = await this.fetchUserWithFollowData(userAuthenticatedId);

    const connectedUserIds = [
      ...user.followers.map((elem) => elem.id),
      ...user.following.map((elem) => elem.id),
      user.id,
    ];

    const recommendedUsers = await userModel.findMany({
      where: { id: { notIn: connectedUserIds } },
      select: userRefSelect,
      take: 4,
    });

    return userRefSchema.array().parse(recommendedUsers);
  }

  static async followUser(userAuthenticatedId: string, userToFollowId: string) {
    await userModel.update({
      where: { id: userAuthenticatedId },
      data: { following: { connect: { id: userToFollowId } } },
    });
  }

  static async unfollowUser(
    userAuthenticatedId: string,
    userToUnfollowId: string
  ) {
    await userModel.update({
      where: { id: userAuthenticatedId },
      data: { following: { disconnect: { id: userToUnfollowId } } },
    });
  }
}
