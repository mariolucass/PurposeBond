import { userModel } from "../database/models";
import { userRefSchema } from "../schemas/users.schemas";
import { userRefSelect } from "../utils/prismaHelpers";

export class FollowServices {
  private static async fetchUserWithFollowData(userId: string) {
    const user = await userModel.findUnique({
      where: { id: userId },
      select: {
        ...userRefSelect,
        followedBy: { select: userRefSelect },
        following: { select: userRefSelect },
      },
    });

    return user!;
  }

  static async getFollowedUsers(userId: string) {
    const { followedBy } = await this.fetchUserWithFollowData(userId);
    return userRefSchema.array().parse(followedBy);
  }

  static async getFollowingUsers(userId: string) {
    const { following } = await this.fetchUserWithFollowData(userId);
    return userRefSchema.array().parse(following);
  }

  static async getRecommendedUsers(userAuthenticatedId: string) {
    const user = await this.fetchUserWithFollowData(userAuthenticatedId);

    const connectedUserIds = [
      ...user.followedBy.map((elem) => elem.id),
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
