import { Post } from "@prisma/client";
import { postModel } from "../database/models";
import { postReturnSchema } from "../schemas/posts.schemas";

export class PostsServices {
  static getPosts = async () => {
    const posts = await postModel.findMany();

    return postReturnSchema.parse(posts);
  };

  static postPost = async (body: Post) => {
    const post = await postModel.create({ data: body });

    return postReturnSchema.parse(post);
  };

  static retrievePost = async (id: string) => {
    const post = await postModel.findFirst({ where: { id: id } });

    return postReturnSchema.parse(post);
  };

  static patchPost = async (id: string, body: {}) => {
    const post = await postModel.update({ where: { id: id }, data: body });

    return postReturnSchema.parse(post);
  };

  static deletePost = async (id: string) => {
    await postModel.delete({ where: { id: id } });
  };
}
