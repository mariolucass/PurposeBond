import { Request, Response } from "express";
import { PostsServices } from "../services/posts.services";

export class PostsController {
  static getPosts = async (req: Request, res: Response) => {
    const posts = await PostsServices.getPosts();

    return res.json(posts);
  };

  static postPost = async (req: Request, res: Response) => {
    const post = await PostsServices.postPost(req.body);

    return res.status(201).json(post);
  };

  static retrievePost = async (req: Request, res: Response) => {
    const postId = res.locals.post.id;
    const post = await PostsServices.retrievePost(postId);

    return res.json(post);
  };

  static patchPost = async (req: Request, res: Response) => {
    const postId = res.locals.post.id;
    const post = await PostsServices.patchPost(postId, req.body);

    return res.json(post);
  };

  static deletePost = async (req: Request, res: Response) => {
    const postId = res.locals.post.id;
    await PostsServices.deletePost(postId);

    return res.status(204);
  };
}
