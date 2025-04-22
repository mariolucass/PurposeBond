import { PostService } from "@/services";
import { Request, Response } from "express";

export class PostController {
  static getPostsByUser = async (_: Request, res: Response) => {
    const userAuthId = res.locals.reqParamsUser.id;
    const posts = await PostService.getPostsByUser(userAuthId);

    return res.json(posts);
  };

  static getPosts = async (_: Request, res: Response) => {
    const posts = await PostService.getPosts();

    return res.json(posts);
  };

  static getDashboardPosts = async (_: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    const posts = await PostService.getDashboardPosts(userAuthId);

    return res.json(posts);
  };

  static postPost = async (req: Request, res: Response) => {
    const userAuthId = res.locals.user.id;
    console.log(req.body);
    const post = await PostService.postPost(userAuthId, req.body);

    return res.status(201).json(post);
  };

  static retrievePost = async (_: Request, res: Response) => {
    const postId = res.locals.post.id;
    const post = await PostService.retrievePost(postId);

    return res.json(post);
  };

  static patchPost = async (req: Request, res: Response) => {
    const postId = res.locals.post.id;
    const post = await PostService.patchPost(postId, req.body.content);

    return res.json(post);
  };

  static deletePost = async (_: Request, res: Response) => {
    const postId = res.locals.post.id;
    await PostService.deletePost(postId);

    return res.status(204);
  };
}
