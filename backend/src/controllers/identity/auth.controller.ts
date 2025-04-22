import { AuthService } from "@/services";
import { Request, Response } from "express";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const register = await AuthService.registerService(req.body);
    return res.json(register);
  };

  static login = async (req: Request, res: Response) => {
    const login = await AuthService.loginService(req.body);
    return res.json(login);
  };
}
