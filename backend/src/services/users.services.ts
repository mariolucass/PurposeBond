import { userModel } from "../database/models";
import { userReturnSchema } from "../schemas/users.schemas";
import { userSelect } from "./../utils/prismaHelpers";

export class UsersServices {
  static getUsers = async () => {
    const users = await userModel.findMany({ select: userSelect });

    return userReturnSchema.array().parse(users);
  };

  static retrieveUser = async (id: string) => {
    const user = await userModel.findFirst({
      where: { id: id },
      select: userSelect,
    });

    return user;
  };

  static patchUser = async (id: string, body: {}) => {
    const user = await userModel.update({
      where: { id: id },
      data: body,
      select: userSelect,
    });

    return userReturnSchema.parse(user);
  };

  static deleteUser = async (id: string) => {
    await userModel.delete({ where: { id: id } });
  };
}
