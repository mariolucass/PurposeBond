import { Post } from "@prisma/client";
import { postModel, userModel } from "../database/models";
import { getPostsSchema, postReturnSchema } from "../schemas/posts.schemas";

export class PostsServices {
  static getNewDashboardPosts = async (userAuthenticatedId: string) => {
    const user = await userModel.findUnique({
      where: { id: userAuthenticatedId },
      select: { following: { select: { id: true } } },
    });

    const followingIds = user!.following.map((user) => user.id);

    const followingPosts = await postModel.findMany({
      where: { authorId: { in: followingIds } },
      orderBy: { createdAt: "desc" },
    });

    return postReturnSchema.array().parse(followingPosts);
  };

  static getDashboardPosts = async (userAuthenticatedId: string) => {
    const user = await userModel.findUnique({
      where: { id: userAuthenticatedId },
      select: { following: { select: { id: true } } },
    });

    const followingIds = user!.following.map((user) => user.id);

    const followingPosts = await postModel.findMany({
      where: { authorId: { in: followingIds } },
      orderBy: { createdAt: "desc" },
    });

    return postReturnSchema.array().parse(followingPosts);
  };

  static getPosts = async () => {
    const posts = await postModel.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: { id: true, username: true, name: true },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return getPostsSchema.array().parse(posts);
  };

  static getPostsByUser = async (userId: string) => {
    const posts = await postModel.findMany({
      where: { authorId: userId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: { id: true, username: true, name: true },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return getPostsSchema.array().parse(posts);
  };

  static getUserPostsAndComments = async (userId: string) => {
    const posts = await postModel.findMany({ where: { authorId: userId } });

    return postReturnSchema.array().parse(posts);
  };

  static postPost = async (userAuthenticatedId: string, body: Post) => {
    const post = await postModel.create({
      data: { ...body, authorId: userAuthenticatedId },
      include: { author: true },
    });

    return postReturnSchema.parse(post);
  };

  static retrievePost = async (id: string) => {
    const post = await postModel.findFirst({
      where: { id: id },

      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: { id: true, username: true, name: true },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: { select: { id: true, username: true, name: true } },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return post;
  };

  static patchPost = async (id: string, body: {}) => {
    const post = await postModel.update({
      data: body,
      where: { id: id },
      include: { author: true },
    });

    return postReturnSchema.parse(post);
  };

  static deletePost = async (id: string) => {
    await postModel.delete({ where: { id: id }, include: { author: true } });
  };
}
