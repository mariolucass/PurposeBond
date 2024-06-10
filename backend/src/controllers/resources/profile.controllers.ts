import { Request, Response } from "express";
import { ProfileServices } from "../../services/resources/profile.services";

export class ProfileController {
  static getProfile = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const user = await ProfileServices.getProfile(userId);

    return res.json(user);
  };

  static getMessages = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const messages = await ProfileServices.getMessages(userId);

    return res.json(messages);
  };

  static getDiscussions = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const discussions = await ProfileServices.getDiscussions(userId);

    return res.json(discussions);
  };

  static getPosts = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const posts = await ProfileServices.getPosts(userId);

    return res.json(posts);
  };

  static getRepostedPosts = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const repostedPosts = await ProfileServices.getRepostedPosts(userId);

    return res.json(repostedPosts);
  };

  static getLikedPosts = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const likedPosts = await ProfileServices.getLikedPosts(userId);

    return res.json(likedPosts);
  };

  static getMedia = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const media = await ProfileServices.getMedia(userId);

    return res.json(media);
  };
}
