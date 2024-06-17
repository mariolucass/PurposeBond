import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { FollowServices } from "../../services/social/follow.services";

export class FollowMiddlewares {
  static preventSelfFollow = (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      user: { id: userAuthenticatedId },
      reqParamsUser: { id: userParamsId },
    } = res.locals;

    if (userAuthenticatedId === userParamsId) {
      throw new AppError(403, "Insufficient permission.");
    }

    return next();
  };

  static verifyFollowNonExistenceForFollow = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      reqParamsUser: userToFollow,
      user: { id: userAuthId },
    } = res.locals;

    const followers = await FollowServices.getFollowersByUser(userToFollow.id);

    const existingFollow = followers.some(
      (follow: { id: string }) => follow.id === userAuthId
    );

    if (existingFollow) {
      throw new AppError(400, "User is already following this user");
    }

    return next();
  };

  static verifyFollowExistenceForUnfollow = async (
    _: Request,
    res: Response,
    next: NextFunction
  ) => {
    const {
      reqParamsUser: userToUnfollow,
      user: { id: userAuthId },
    } = res.locals;

    const followers = await FollowServices.getFollowersByUser(
      userToUnfollow.id
    );

    const followRelationship = followers.find(
      (follow: { id: string }) => follow.id === userAuthId
    );

    if (!followRelationship) {
      throw new AppError(404, "Follow relationship not found");
    }

    return next();
  };
}
