import { Request, Response } from "express";
import { PostsServices } from "../services/posts.services";

export class PostsController {
  static getPostsByUser = async (_: Request, res: Response) => {
    const userAuthId = res.locals.reqParamsUser.id;
    const posts = await PostsServices.getPostsByUser(userAuthId);

    return res.json(posts);
  };

  static getPosts = async (_: Request, res: Response) => {
    const posts = await PostsServices.getPosts();

    return res.json(posts);
  };

  static getDashboardPosts = async (_: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const posts = await PostsServices.getDashboardPosts(userAuthId);

    return res.json(posts);
  };

  static postPost = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const post = await PostsServices.postPost(userAuthId, req.body);

    return res.status(201).json(post);
  };

  static retrievePost = async (_: Request, res: Response) => {
    const postId = res.locals.post.id;
    const post = await PostsServices.retrievePost(postId);

    return res.json(post);
  };

  static patchPost = async (req: Request, res: Response) => {
    const postId = res.locals.post.id;
    const post = await PostsServices.patchPost(postId, req.body);

    return res.json(post);
  };

  static deletePost = async (_: Request, res: Response) => {
    const postId = res.locals.post.id;
    await PostsServices.deletePost(postId);

    return res.status(204);
  };
}
