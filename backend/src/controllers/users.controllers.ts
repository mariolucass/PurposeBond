import { Request, Response } from "express";
import { UsersServices } from "../services/users.services";

export class UsersController {
  static getUsers = async (req: Request, res: Response) => {
    const users = await UsersServices.getUsers();

    return res.json(users);
  };

  static retrieveUser = async (req: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;
    const user = await UsersServices.retrieveUser(userId);

    return res.json(user);
  };

  static patchUser = async (req: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;

    const user = await UsersServices.patchUser(userId, req.body);

    return res.json(user);
  };

  static deleteUser = async (req: Request, res: Response) => {
    const userId = res.locals.reqParamsUser.id;

    await UsersServices.deleteUser(userId);

    return res.status(204);
  };
}
