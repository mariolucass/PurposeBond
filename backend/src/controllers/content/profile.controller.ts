import { ProfileService } from "@/services";
import { Request, Response } from "express";

export class ProfileController {
  static getProfile = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const user = await ProfileService.getProfile(userId);

    return res.json(user);
  };

  static getCountStats = async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    const property = req.query.property;

    const user = await ProfileService.getCountStats(userId, property as string);

    return res.json(user);
  };

  static getMessages = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const messages = await ProfileService.getMessages(userId);

    return res.json(messages);
  };

  static getDiscussions = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const discussions = await ProfileService.getDiscussions(userId);

    return res.json(discussions);
  };

  static getPosts = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const posts = await ProfileService.getPosts(userId);

    return res.json(posts);
  };

  static getRepostedPosts = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const repostedPosts = await ProfileService.getRepostedPosts(userId);

    return res.json(repostedPosts);
  };

  static getLikedPosts = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const likedPosts = await ProfileService.getLikedPosts(userId);

    return res.json(likedPosts);
  };

  static getMedia = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const media = await ProfileService.getMedia(userId);

    return res.json(media);
  };

  static getFollowers = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const followers = await ProfileService.getFollowers(userId);

    return res.json(followers);
  };

  static getFollowing = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const following = await ProfileService.getFollowing(userId);

    return res.json(following);
  };
}
