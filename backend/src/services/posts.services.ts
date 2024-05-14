import { Post } from "@prisma/client";
import { postModel } from "../database/models";
import { postReturnSchema } from "../schemas/posts.schemas";

export class PostsServices {
  static getPosts = async () => {
    const posts = await postModel.findMany({ include: { author: true } });

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
      include: { author: true },
    });

    return postReturnSchema.parse(post);
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
