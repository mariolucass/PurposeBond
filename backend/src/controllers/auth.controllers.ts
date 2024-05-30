import { Request, Response } from "express";
import { AuthServices } from "../services/auth.services";

export class AuthController {
  static register = async (req: Request, res: Response) => {};

  static login = async (req: Request, res: Response) => {
    const login = await AuthServices.loginService(req.body);
    return res.json(login);
  };

  static getProfile = async (_: Request, res: Response) => {
    const userId = res.locals.user.id;
    const user = await AuthServices.getProfile(userId);
    return res.json(user);
  };
}
