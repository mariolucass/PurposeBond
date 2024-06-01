import { userModel } from "../database/models";
import {
  commentRefSelect,
  postRefSelect,
  userRefSelect,
  userSelect,
} from "../utils/prismaHelpers";

export class ProfileServices {
  static getProfile = async (id: string) => {
    const user = await userModel.findUnique({
      where: { id: id },
      select: {
        ...userSelect,
        posts: { select: postRefSelect },
        comments: { select: commentRefSelect },
        likes: { select: { post: { select: postRefSelect } } },
        followedBy: { select: userRefSelect },
        following: { select: userRefSelect },
      },
    });

    return user;
  };
}
