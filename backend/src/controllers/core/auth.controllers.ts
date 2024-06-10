import { Request, Response } from "express";
import { AuthServices } from "../../services/core/auth.services";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const register = await AuthServices.registerService(req.body);
    return res.json(register);
  };

  static login = async (req: Request, res: Response) => {
    const login = await AuthServices.loginService(req.body);
    return res.json(login);
  };
}
