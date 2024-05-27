import { postModel } from "../database/models";
import { PostCreateInterface } from "../interfaces/posts.interfaces";
import { postReturnSchema } from "../schemas/posts.schemas";
import { commentRefSelect, postSelect } from "../utils/prismaHelpers";
import { FollowServices } from "./follow.services";

export class PostsServices {
  private static async fetchPosts(whereClause: any) {
    const posts = await postModel.findMany({
      where: whereClause,
      select: postSelect,
      orderBy: { createdAt: "desc" },
    });

    return postReturnSchema.array().parse(posts);
  }

  static getNewerDashboardPosts = async (
    userAuthenticatedId: string,
    createdAt: Date
  ) => {
    const followingUsers = await FollowServices.getFollowingUsers(
      userAuthenticatedId
    );
    const followingIds = followingUsers.map((user) => user.id);

    return this.fetchPosts({
      authorId: { in: followingIds },
      createdAt: { gt: createdAt },
    });
  };

  static getDashboardPosts = async (userAuthenticatedId: string) => {
    const followingUsers = await FollowServices.getFollowingUsers(
      userAuthenticatedId
    );
    const followingIds = followingUsers.map((user) => user.id);

    return this.fetchPosts({ authorId: { in: followingIds } });
  };

  static getPosts = async () => {
    return this.fetchPosts({});
  };

  static getPostsByUser = async (userId: string) => {
    return this.fetchPosts({ authorId: userId });
  };

  static getPostsWithCommentsByUser = async (userId: string) => {
    const posts = await postModel.findMany({
      where: { authorId: userId },
      select: {
        ...postSelect,
        comments: { select: commentRefSelect },
      },
      orderBy: { createdAt: "desc" },
    });

    return postReturnSchema.array().parse(posts);
  };

  static async postPost(
    userAuthenticatedId: string,
    body: PostCreateInterface
  ) {
    const post = await postModel.create({
      data: { ...body, authorId: userAuthenticatedId },
      select: postSelect,
    });

    return postReturnSchema.parse(post);
  }

  static async retrievePost(id: string) {
    const post = await postModel.findUnique({
      where: { id },
      select: postSelect,
    });

    return postReturnSchema.parse(post);
  }

  static async patchPost(id: string, content: string) {
    const post = await postModel.update({
      data: { content },
      where: { id },
      select: postSelect,
    });

    return postReturnSchema.parse(post);
  }

  static async deletePost(id: string) {
    await postModel.delete({ where: { id } });
  }
}
