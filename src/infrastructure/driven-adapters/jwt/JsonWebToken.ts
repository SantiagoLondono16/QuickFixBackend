import {
  TokenPayload,
  TokenRepository,
} from "@domain/model/account/gateways/TokenRepository";

import jwt from "jsonwebtoken";

export class JsonWebToken implements TokenRepository {
  private static SECRET = process.env.SECRET || "123";

  generate(id: string, email: string): TokenPayload {
    const userdata = { _id: id, email };
    const token = jwt.sign(userdata, JsonWebToken.SECRET as string, {
      expiresIn: "1d",
    });

    return {
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      user: { id, email },
    };
  }

  verify(token: string): boolean {
    if (!token) throw new Error("Invalid Token");
    try {
      jwt.verify(token, JsonWebToken.SECRET as string);
      return true;
    } catch {
      return false;
    }
  }
}
