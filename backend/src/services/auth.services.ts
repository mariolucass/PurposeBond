import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { userModel } from "../database/models";
import { AppError } from "../errors/appError";

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

    const token = sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY!,
      {
        subject: user.id,
        expiresIn: "24h",
      }
    );

    return { token: token };
  };

  static registerService = async () => {};
}
