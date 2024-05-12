import { userModel } from "../database/models";

export class FollowServices {
  static getFollowedUsers = async (userAuthenticatedId: string) => {
    const usersFollowedBy = await userModel.findUnique({
      where: { id: userAuthenticatedId },
      select: {
        followedBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return usersFollowedBy!.followedBy;
  };

  static getFollowingUsers = async (userAuthenticatedId: string) => {
    const usersFollowing = await userModel.findUnique({
      where: { id: userAuthenticatedId },
      select: {
        following: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    return usersFollowing!.following;
  };

  static followUser = async (
    userAuthenticatedId: string,
    userToFollowId: string
  ) => {
    const newFollow = await userModel.update({
      where: { id: userAuthenticatedId },
      data: {
        following: {
          connect: { id: userToFollowId },
        },
      },
    });

    return newFollow;
  };

  static unfollowUser = async (
    userAuthenticatedId: string,
    userToUnfollowId: string
  ) => {
    await userModel.update({
      where: { id: userAuthenticatedId },
      data: {
        following: {
          disconnect: { id: userToUnfollowId },
        },
      },
    });
  };
}
