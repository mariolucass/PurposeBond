import { Request, Response } from "express";
import { ProfileServices } from "../services/profile.services";

export class ProfileController {
  static getProfile = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const user = await ProfileServices.getProfile(userId);

    return res.json(user);
  };

  static getMessages = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const user = await ProfileServices.getProfile(userId);

    return res.json(user);
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

  static getLikes = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const likes = await ProfileServices.getLikes(userId);

    return res.json(likes);
  };

  static getMedia = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const media = await ProfileServices.getMedia(userId);

    return res.json(media);
  };
}
