import { userModel } from "../database/models";
import { userReturnSchema } from "../schemas/users.schemas";

export class UsersServices {
  static getUsers = async () => {
    const users = await userModel.findMany();

    return userReturnSchema.array().parse(users);
  };

  static retrieveUser = async (id: string) => {
    const user = await userModel.findFirst({
      where: { id: id },
      include: { posts: true },
    });

    return user;
  };

  static patchUser = async (id: string, body: {}) => {
    const user = await userModel.update({ where: { id: id }, data: body });

    return userReturnSchema.parse(user);
  };

  static deleteUser = async (id: string) => {
    await userModel.delete({ where: { id: id } });
  };
}
