import { Request, Response } from "express";
import { ProfileServices } from "../services/profile.services";

export class ProfileController {
  static getProfile = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const user = await ProfileServices.getProfile(userId);

    return res.json(user);
  };
}
