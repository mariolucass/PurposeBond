import { userModel } from "../database/models";

export class FollowServices {
  static getRecommendedUsers = async (userAuthenticatedId: string) => {
    const user = await userModel.findUnique({
      where: { id: userAuthenticatedId },
      select: {
        followedBy: { select: { id: true } },
        following: { select: { id: true } },
      },
    });

    const followedByIds = user!.followedBy.map((user) => user.id!);
    const followingIds = user!.following.map((user) => user.id!);

    const connectedUserIds = [
      ...followedByIds,
      ...followingIds,
      userAuthenticatedId,
    ];

    const recommendedUsers = await userModel.findMany({
      where: { id: { notIn: connectedUserIds } },
    });

    return recommendedUsers;
  };

  static getFollowedUsers = async (userAuthenticatedId: string) => {
    const user = await userModel.findUnique({
      where: { id: userAuthenticatedId },
      select: { followedBy: { select: { id: true, username: true } } },
    });

    return user!.followedBy;
  };

  static getFollowingUsers = async (userAuthenticatedId: string) => {
    const user = await userModel.findUnique({
      where: { id: userAuthenticatedId },
      select: { following: { select: { id: true, username: true } } },
    });

    return user!.following;
  };

  static followUser = async (
    userAuthenticatedId: string,
    userToFollowId: string
  ) => {
    await userModel.update({
      where: { id: userAuthenticatedId },
      data: { following: { connect: { id: userToFollowId } } },
    });
  };

  static unfollowUser = async (
    userAuthenticatedId: string,
    userToUnfollowId: string
  ) => {
    await userModel.update({
      where: { id: userAuthenticatedId },
      data: { following: { disconnect: { id: userToUnfollowId } } },
    });
  };
}
