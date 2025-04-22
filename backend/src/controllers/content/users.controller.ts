import { UserService } from "@/services";
import { Request, Response } from "express";

export class UserController {
  static getUsers = async (_: Request, res: Response) => {
    const users = await UserService.getUsers();

    return res.json(users);
  };

  static retrieveUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    const user = await UserService.retrieveUser(userId);

    return res.json(user);
  };

  static patchUser = async (req: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    const user = await UserService.patchUser(userId, req.body);

    return res.json(user);
  };

  static deleteUser = async (_: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    await UserService.deleteUser(userId);

    return res.status(204);
  };
}
