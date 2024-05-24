import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { userModel } from "../database/models";
import { AppError } from "../errors/appError";
import { userReturnSchema } from "../schemas/users.schemas";

export class AuthServices {
  static loginService = async (body: { email: string; password: string }) => {
    const user = await userModel.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      throw new AppError(403, "User or password invalid");
    }

    const passwordMatch = await compare(body.password, user.password);

    if (!passwordMatch) {
      throw new AppError(403, "User or password invalid");
    }

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    const jwtConfig = {
      subject: user.id,
      expiresIn: "24h",
    };

    const token = sign(userData, process.env.JWT_SECRET!, jwtConfig);

    return { accessToken: token, user: userReturnSchema.parse(user) };
  };

  static registerService = async (body: any) => {
    body.password = await hash(body.password, 10);

    const user = await userModel.create({ data: body });

    return userReturnSchema.parse(user);
  };

  static getProfile = async (id: string) => {
    const user = await userModel.findFirst({
      where: { id: id },
      include: { posts: true, comments: true, likes: true },
    });

    return userReturnSchema.parse(user);
  };
}
